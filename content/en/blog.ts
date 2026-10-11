import type { Post } from "../schema";

// Starter articles. draft: true until the owner approves.
export const posts: Post[] = [
  {
    slug: "how-to-choose-first-process-to-automate-with-ai",
    title: "How to choose the first process to automate with AI",
    excerpt: "A simple way to rank candidate processes by effort, impact and risk.",
    date: "2026-10-11",
    readMin: 5,
    draft: true,
    tags: ["discovery", "strategy"],
    body: [
      { h: "Start with pain, not technology", p: "List the processes that cost the most time, create the most errors or lose the most leads. Technology choices come after." },
      { h: "Score each candidate", p: "Rate every process on three things: how much time or money it consumes (impact), how hard it is to automate (effort) and what happens if the automation is wrong (risk)." },
      { h: "Pick one with a clear owner", p: "A good first process has a clear owner, accessible data and a measurable result. That is what a department discovery produces: a ranked shortlist." },
      { h: "Prove it small", p: "Build a working MVP on real data for that one process, then decide whether to scale." },
    ],
  },
  {
    slug: "private-llm-vs-openai-api",
    title: "Private LLM vs OpenAI API: when local models save money",
    excerpt: "How to compare per-token API costs with running open-weight models yourself.",
    date: "2026-10-11",
    readMin: 6,
    draft: true,
    tags: ["private-llm", "cost"],
    body: [
      { h: "Two cost models", p: "APIs charge per token and scale with usage. Local models have fixed infrastructure cost and scale with hardware." },
      { h: "When local wins", p: "Steady high volume, sensitive data or strict compliance rules often favor running open-weight models such as Llama, Qwen or Mistral on your own servers." },
      { h: "When the API wins", p: "Low or spiky volume, and tasks that need the strongest frontier models, usually fit an API better." },
      { h: "Hybrid routing", p: "Use a local model for routine work and route hard tasks to a frontier API. Compare costs on your own volume before deciding." },
    ],
  },
  {
    slug: "what-an-ai-discovery-of-a-department-looks-like",
    title: "What an AI discovery of a department looks like",
    excerpt: "Interviews, AS-IS maps and a prioritized automation map: what you get and what we need from you.",
    date: "2026-10-11",
    readMin: 4,
    draft: true,
    tags: ["discovery"],
    body: [
      { h: "The format", p: "Up to five interviews of 45–60 minutes with key employees of one department." },
      { h: "The analysis", p: "We describe the AS-IS processes, find routine, time losses and bottlenecks, and score automation opportunities." },
      { h: "The result", p: "You receive the described processes and a top-5 automation map with effort, impact and rough ROI, presented in a 60-minute session." },
      { h: "What we need from you", p: "A sponsor, access to the right people and an honest picture of how work really happens." },
    ],
  },
];
