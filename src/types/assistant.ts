export type AssistantRole = "user" | "assistant";

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
};

export type AssistantRequest = {
  message: string;
  history: string[];
};

export type AssistantEvent =
  | { event: "meta"; data: { topics: string[]; sources: string[] } }
  | { event: "token"; data: { text: string } }
  | { event: "refusal"; data: { reason: string; text: string } }
  | { event: "done"; data: { timings: Record<string, number> } }
  | { event: "busy"; data: { retry_after_s: number } }
  | { event: "rate_limited"; data: { retry_after_s: number } }
  | { event: "error"; data: { message: string } };
