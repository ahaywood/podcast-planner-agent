import { titlesObject } from "../functions/titles";
import { outlineObject } from "../functions/outline";
import { socialMediaObject } from "../functions/socialMedia";

import { tool } from "ai";
import z from "zod";

export const assetGenerator = tool({
  name: "generate-assets",
  description: `This tool generates assets for a podcast episode based on the provided
    topic. Use this tool when the user asks for assets or is trying to plan
    the content of the episode.`,
  inputSchema: z.object({
    topic: z.string().describe("The topic of the episode"),
  }),
  execute: async ({ topic }) => {
    console.log("🎯 asset generator tool called");

    // Generate content in parallel
    const [titleContent, outlineContent, socialMediaContent] =
      await Promise.all([
        titlesObject(topic),
        outlineObject(topic),
        socialMediaObject(topic),
      ]);

    return [titleContent, outlineContent, socialMediaContent];
  },
});
