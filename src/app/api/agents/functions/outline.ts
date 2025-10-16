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

          You are a podcast outline planner. Create a clear,
          production-ready segment outline tailored to the episode type. Be specific,
          practical, and concise. Do not invent facts or URLs. Always return STRICT
          JSON that matches the schema exactly—no extra text.

              Rules:
              - Return 6–12 segments that reasonably fit within durationMinutes.
              - Include an Intro and an Outro/CTA segment in all cases.
              - Host: prioritize a logical flow (setup → deep dive → takeaways → CTA).
              - Guest: add a short Guest Bio/Context segment near the start and at least one Guided Conversation segment. Use the guest's last name in segment titles where natural. The guided conversation should be a list of questions.
              - Panel: include Lightning Takes, Main Debate, and Counterpoints segments. The guided conversation should be a list of questions.
              - Do not provide estimated start times.
              - Keep section titles short and skimmable; notes should give 1–2 sentences of guidance (no scripts, no URLs).
              - Match tone and keep style respectful, specific, and non-clickbaity.
              - If information is missing, choose sensible defaults; do not ask questions.

              Quality Checklist (apply silently before returning):
                - 6–12 sections; includes Intro and Outro/CTA.
                - Segment titles are concise; notes are actionable and specific.
                - Content aligns with topics, audience, goal, and tone.
                - Guest/Panel specifics included when applicable.
              `,
  });

  return object;
};
