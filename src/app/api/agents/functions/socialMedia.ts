import { Constants } from "@/lib/constants";
import { generateObject } from "ai";
import z from "zod";
import { systemPrompt } from "../systemPrompt";

export const socialMediaObject = async (topic: string) => {
  const { object } = await generateObject({
    model: Constants.OPENAI_MODEL,
    system: systemPrompt,
    schema: z.object({
      socialMedia: z
        .array(
          z.object({
            platform: z
              .enum(["twitter", "linkedin"])
              .describe("The platform of the social media post"),
            post: z.string().describe("The content of the social media post"),
          })
        )
        .describe(
          "The social media posts promoting the episode, before it's recorded."
        ),
    }),
    prompt: `Topic: ${topic}
              You are a social promotion assistant for an upcoming podcast
              episode. Write clear, non-clickbaity copy that invites people to
              tune in live and submit questions. Match tone and audience. Never
              invent times, URLs, or names—use the provided values or the
              placeholders exactly as given.

              Rules:
              - Purpose: Promote the upcoming episode (not a recap). Make it easy to attend live or submit questions in advance.
              - X (Twitter) Thread: 4–7 posts; each ≤ 260 chars (to leave room for links).
                - Post 1: announce live time + episodeTitle + streamUrl (or {STREAM_URL}).
                - Post 2–3: what listeners will learn (use 1–2 topics).
                - Post 4: CTA to submit questions with questionsUrl (or {QUESTIONS_URL}); if episodeType="guest", mention the guest's last name.
                - Optional: 1–2 lightweight hashtags total (prefer primaryHashtag if provided). No emoji spam (≤1 per post).
              - LinkedIn Post: 1–2 short paragraphs + a compact bullet list of topics (3–5 bullets).
                - Include live date/time, audience fit, and clear CTAs for Attend Live (streamUrl) and Submit Questions (questionsUrl).
                - Keep ≤ 1,300 characters.
              - Tone: honor the tone; be specific, helpful, and respectful; no clickbait.
              - Don't invent: If a value is missing, use the placeholder exactly ({STREAM_URL}, {QUESTIONS_URL}).
              - Branding: If handles are provided, use them once (e.g., "Live with {brandHandleX}").
              - Hashtags: Use at most two total across each artifact; avoid stuffing.
              - No duplicate sentences across artifacts; vary phrasing.

              Quality Checklist (apply silently)
              - X posts ≤ 260 chars each; LinkedIn ≤ 1300 chars; varied sentences.
              - Contains both CTAs: attend live (streamUrl/placeholder) and submit questions (questionsUrl/placeholder).
              - Guest episodes mention guest's last name in at least one artifact.
              - Uses ≤ 2 total hashtags per artifact; no invented URLs, names, or times.
              - Tone matches; audience and topics are reflected naturally.
              `,
  });

  return object;
};
