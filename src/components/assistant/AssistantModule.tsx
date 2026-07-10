import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { sendAssistantMessage } from "../../services/assistantClient";
import type { AssistantMessage } from "../../types/assistant";
import { PromptChips } from "./PromptChips";

export function AssistantModule() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const hasChat = messages.length > 0 || typing;

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  async function submit(rawText: string) {
    const text = rawText.trim();
    if (!text || typing) return;

    const userMessage: AssistantMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    try {
      const response = await sendAssistantMessage({
        message: text,
        history: nextMessages,
      });
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          ...response.message,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn't reach the assistant service. The demo fallback is still available while the real backend is being wired in.",
        },
      ]);
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
            {typing && (
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
            aria-label="Ask the assistant"
          />
          <button
            type="submit"
            className="send-btn flex h-10 w-10 flex-none items-center justify-center rounded-full border-0 bg-appleBlue text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            title="Send"
            aria-label="Send"
            disabled={typing}
          >
            <FaArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        </form>
      </div>
      <div className="mt-3 text-[12.5px] text-[#a1a1a6] dark:text-[#858592]">
        This is a demo chat with sample answers — wire it to a real model later.
      </div>
    </>
  );
}
