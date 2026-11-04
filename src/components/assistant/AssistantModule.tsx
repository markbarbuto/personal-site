import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { BlueAction } from "../BlueAction";
import { streamAssistant } from "../../services/assistantClient";
import type { AssistantEvent, AssistantMessage } from "../../types/assistant";
import { PromptChips } from "./PromptChips";

const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 6;
const OFFLINE_TEXT = "My assistant is offline right now. Email me at markbarbuto@outlook.com.";

function formatWait(seconds: number) {
  if (seconds < 90) return "a minute";
  if (seconds < 3600) return `about ${Math.round(seconds / 60)} minutes`;
  const hours = Math.round(seconds / 3600);
  return hours === 1 ? "about an hour" : `about ${hours} hours`;
}

function applyEvent(reply: string, { event, data }: AssistantEvent) {
  switch (event) {
    case "token":
      return reply + data.text;
    case "refusal":
      return data.text;
    case "busy":
      return "I'm answering someone else right now. Give me a moment and try again.";
    case "rate_limited":
      return `You've reached the question limit for now. Try again in ${formatWait(data.retry_after_s)}.`;
    case "error":
      return OFFLINE_TEXT;
    case "meta":
    case "done":
      return reply;
  }
}

export function AssistantModule() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const hasChat = messages.length > 0 || typing;
  const awaitingReply = typing && messages.at(-1)?.role === "user";

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  async function submit(rawText: string) {
    const text = rawText.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!text || typing) return;

    const history = messages
      .filter((message) => message.role === "user")
      .map((message) => message.content)
      .slice(-MAX_HISTORY);
    const replyId = crypto.randomUUID();
    let reply = "";

    function showReply(content: string) {
      reply = content;
      if (!content) return;
      setMessages((current) =>
        current.some((message) => message.id === replyId)
          ? current.map((message) => (message.id === replyId ? { ...message, content } : message))
          : [...current, { id: replyId, role: "assistant", content }],
      );
    }

    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content: text }]);
    setInput("");
    setTyping(true);

    try {
      for await (const event of streamAssistant({ message: text, history })) {
        showReply(applyEvent(reply, event));
      }
      if (!reply) showReply(OFFLINE_TEXT);
    } catch {
      // A stream cut mid-answer keeps what already arrived.
      if (!reply) showReply(OFFLINE_TEXT);
    } finally {
      setTyping(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submit(input);
    }
  }

  return (
    <>
      <PromptChips onSelect={(prompt) => void submit(prompt)} />
      <div className="mt-3 w-full max-w-[772px] overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-float transition-colors dark:border-white/10 dark:bg-[#19191f] dark:shadow-[0_18px_52px_rgba(0,0,0,0.34)]">
        {hasChat && (
          <div
            ref={chatRef}
            className="max-h-[340px] overflow-y-auto px-[22px] pb-1.5 pt-[22px] text-left"
            aria-live="polite"
          >
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`mb-3 flex fade-up ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-[15px] py-[11px] text-[15px] leading-normal ${
                      isUser
                        ? "rounded-[20px_20px_6px_20px] bg-appleBlue text-white"
                        : "rounded-[20px_20px_20px_6px] bg-[#f0f0f2] text-ink dark:bg-[#262630] dark:text-[#f5f5f7]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}
            {awaitingReply && (
              <div className="mb-3 flex justify-start">
                <div className="flex gap-1 rounded-[18px] bg-[#f0f0f2] px-4 py-[13px] dark:bg-[#262630]">
                  {[0, 0.2, 0.4].map((delay) => (
                    <span
                      key={delay}
                      className="h-[7px] w-[7px] rounded-full bg-[#9a9aa0]"
                      style={{ animation: `blink 1.2s infinite ${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <form
          className="flex items-center gap-2.5 border-t border-black/5 py-3 pl-5 pr-3 dark:border-white/10"
          onSubmit={onSubmit}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything about my work…"
            className="min-w-0 flex-1 border-none bg-transparent text-[15.5px] text-ink outline-none dark:text-white"
            maxLength={MAX_MESSAGE_CHARS}
            aria-label="Ask the assistant"
          />
          <BlueAction
            type="submit"
            iconOnly
            title="Send"
            aria-label="Send"
            disabled={typing}
          >
            <FaArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />
          </BlueAction>
        </form>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[12.5px] text-[#a1a1a6] dark:text-[#858592]">
        <svg
          aria-hidden="true"
          viewBox="11 11 100 100"
          className="h-[13px] w-[13px] flex-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeMiterlimit="8"
        >
          <path d="M47.2 25.5 H95.2 L63.2 81.5 L47.2 59.5 Z" />
          <path d="M24.8 38.5 H72.8 L40.8 94.5 L24.8 72.5 Z" />
        </svg>
        Vitae AI
      </div>
    </>
  );
}
