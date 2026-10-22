import type { AssistantRequest, AssistantResponse } from "../types/assistant";
import { answerDemoQuestion } from "./assistantAnswers";

const apiUrl = import.meta.env.VITE_ASSISTANT_API_URL;

export async function sendAssistantMessage({
  message,
  history,
}: AssistantRequest): Promise<AssistantResponse> {
  if (apiUrl) {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error(`Assistant API returned ${response.status}`);
    }

    return response.json() as Promise<AssistantResponse>;
  }

  await wait(800);

  return {
    message: {
      role: "assistant",
      content: answerDemoQuestion(message),
    },
  };
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
