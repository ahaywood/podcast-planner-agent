import { Experimental_Agent as Agent, stepCountIs } from "ai";
import { assetGenerator } from "./tools/assetGenerator";
import { Constants } from "@/lib/constants";
import { outline } from "./tools/outline";
import { socialMedia } from "./tools/socialMedia";
import { titles } from "./tools/titles";

// Set the maximum duration for this function
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  const { prompt }: { prompt?: string } = await request.json();

  if (!prompt) {
    return Response.json({ error: "Prompt is required" }, { status: 400 });
  }

  const assetGeneratorAgent = new Agent({
    model: Constants.OPENAI_MODEL,
    tools: {
      assetGenerator,
      outline,
      socialMedia,
      titles,
    },
    stopWhen: stepCountIs(1),
  });

  const result = await assetGeneratorAgent.generate({ prompt });

  console.log({ result });

  return Response.json(result);
}
