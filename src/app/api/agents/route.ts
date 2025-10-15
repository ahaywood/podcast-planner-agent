import { Constants } from "@/lib/constants";
import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { titles } from "./tools/titles";
import { outline } from "./tools/outline";
import { socialMedia } from "./tools/socialMedia";

// Set the maximum duration for this function
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  const { topic }: { topic?: string } = await request.json();

  if (!topic) {
    return new Response("Topic is required", { status: 400 });
  }

  const result = await generateText({
    model: Constants.OPENAI_MODEL,
    prompt: `Topic: ${topic}
      You are a podcast planner. You are given a topic and you need to generate
      a podcast outline, titles, and social media posts.

      The podcast is aimed at web developers who primarily use React and JavaScript.

      They are interested in learning about the latest trends in web development,
      including new frameworks, libraries, and tools.

      The podcast is hosted by Amy Dutton and Brad Garropy.

      The podcast is recorded live on YouTube and X (Twitter) and the audience
      can ask questions in advance.
      `,
    stopWhen: stepCountIs(6),
    tools: {
      titles,
      outline,
      socialMedia,
    },
  });

  return Response.json({
    // steps: result.steps,
    finalAnswer: result.text,
  });
}
