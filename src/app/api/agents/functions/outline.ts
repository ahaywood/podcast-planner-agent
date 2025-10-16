import { Constants } from "@/lib/constants";
import { generateObject } from "ai";
import z from "zod";
import { systemPrompt } from "../systemPrompt";

export const outlineObject = async (topic: string) => {
  const { object } = await generateObject({
    model: Constants.OPENAI_MODEL,
    system: systemPrompt,
    schema: z.object({
      outline: z
        .array(
          z.object({
            section: z.string().describe("The title of the section"),
            notes: z
              .array(z.string())
              .describe("The notes, topics, or questions for each section"),
          })
        )
        .describe("The outline of the episode"),
    }),
    prompt: `Topic: ${topic}
          You are a podcast outline planner. Return **STRICT JSON only** that matches the schema; no extra text. Be specific, practical, concise. Do not invent facts or URLs.
          Rules
          - 6–12 segments; always include **Intro** and **Outro/CTA**.
          - **Host:** logical flow (setup → deep dive → takeaways → CTA).
          - **Guest:** early **Guest Bio/Context**; add a **Guided Conversation** segment with a list of questions; use guest’s last name naturally.
          - **Panel:** include **Lightning Takes**, **Main Debate**, **Counterpoints**; add a **Guided Conversation** segment with a list of questions.
          - No timestamps.
          - Titles short and skimmable; notes = 1–2 sentences or a question list (no scripts, no URLs).
          - Match tone/audience/goal; no clickbait.
          - If info is missing, choose sensible defaults; do not ask questions.
          Quality Check (silent)
          - 6–12 sections; has Intro and Outro/CTA.
          - Concise titles; actionable notes.
          - Guest/Panel specifics present when applicable.
          `,
  });

  return object;
};
