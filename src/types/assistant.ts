export type AssistantRole = "user" | "assistant";

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
};

export type AssistantRequest = {
  message: string;
  history: AssistantMessage[];
};

export type AssistantResponse = {
  message: Omit<AssistantMessage, "id">;
};
