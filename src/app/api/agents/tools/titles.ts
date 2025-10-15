import { Constants } from "@/lib/constants";
import { generateText, tool } from "ai";
import z from "zod";

export const titles = tool({
  name: "generate-titles",
  description: `Suggests concise, compelling podcast episode title options
    based on provided topic. Use this tool when the user asks for title ideas.`,
  inputSchema: z.object({
    topic: z.string().describe("The topic of the episode"),
  }),
  outputSchema: z.object({
    titles: z.array(z.string()).describe("The titles of the episode"),
  }),
  execute: async ({ topic }) => {
    const { text } = await generateText({
      model: Constants.OPENAI_MODEL,
      prompt: `Topic: ${topic}
              Rules:
              - Generate 5-8 distinct title options.
              - Prefer ≤ 60 characters; never exceed 70 characters.
              - Use Title Case. Avoid ALL CAPS, emojis, & excessive punctuation.
              - Be specific; avoid vague clickbait (“You Won’t Believe...”).
              - Naturally incorporate 1–2 key topics (no keyword stuffing).
              - Aim for a mix of styles across the set:
                - Benefit-Led (clear value)
                - How-To/Actionable
                - Question-Form
                - Curiosity/Hook (but still honest)
                - SEO-Friendly (straightforward, includes a primary topic)
              - Avoid leading with episode numbers or “Episode” text.
              - Do not invent names, brands, or claims that aren’t in the inputs.
              - The tone should be friendly, engaging, and professional.
              - Do not include extra formatting like bolding, italics, or quotes.
              - Only one option should include a ":" with a subtitle. All the other titles must be single-clause phrases.
              - Do not include any other text than the titles.

              Quality Checklist (apply silently before returning):
                - Each option ≤70 chars (prefer ≤60).
                - Distinct angles; no near-duplicates.
                - Reads naturally for the stated audience and tone.
              `,
    });

    console.log("🎯 generateTitles tool response:");
    const result = JSON.parse(text);
    console.log("🎯 generateTitles tool parsed result:", result);

    return result;
  },
});
