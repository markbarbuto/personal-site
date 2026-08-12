import type { AssistantRequest, AssistantResponse } from "../types/assistant";

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

function answerDemoQuestion(question: string) {
  const text = question.toLowerCase();

  if (/(experience|work|job|career|role|company|companies)/.test(text)) {
    return "Sure! I've been building software for about seven years. Right now I'm a Senior Software Engineer at Northwind Labs leading real-time collaboration features. Before that I was at Brightline growing their dashboard to 40k users, and I started out at Kite & Co. modernizing a legacy Rails app. Want me to dig into any of those?";
  }

  if (/(project|built|build|ship|portfolio|made)/.test(text)) {
    return "A few I'm proud of: Ledger, a privacy-first finance app that runs fully on-device; Waypoint, a CLI that maps any git repo (3k+ devs use it); and Chatterbox — the little AI you're chatting with right now. Scroll down to Projects for the write-ups!";
  }

  if (/(skill|tech|stack|language|tool|framework)/.test(text)) {
    return "Day to day I'm in TypeScript, Python and Go. On the front end that's React, Next.js and Tailwind; on the back end Node, FastAPI and a mix of Postgres, Redis and Mongo. I've also been going deep on applied AI with PyTorch lately.";
  }

  if (/(fun|hobby|hobbies|interest|outside|free time|weekend)/.test(text)) {
    return "Outside of code I shoot 35mm film, run trails, and I'm a bit of a home-espresso nerd. There's also some bouldering and a slowly growing shelf of synths. The Fun section has the full list 😄";
  }

  if (/(contact|email|reach|hire|hiring|available|opportun|open to)/.test(text)) {
    return "I'm open to new opportunities! The fastest way to reach me is email at markbarbuto@outlook.com, or find me on LinkedIn and GitHub. Head to the Contact section at the bottom to connect.";
  }

  if (/(who|about|yourself|intro|tell me about you)/.test(text)) {
    return "Hey! I'm Mark, a software developer who likes turning messy problems into calm, well-crafted products. I care a lot about clean interfaces and fast feedback loops. Ask me about my experience, projects, or tech stack!";
  }

  return "Great question! I'm a demo version of Mark's assistant, so I know about his experience, projects, tech stack, and interests. Try asking about any of those — or scroll down to explore the site.";
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
