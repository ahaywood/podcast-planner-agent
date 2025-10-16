import { tool } from "ai";
import z from "zod";
import { socialMediaObject } from "../functions/socialMedia";

export const socialMedia = tool({
  name: "generate-social-media",
  description: `This tool generates social media posts for a podcast episode
    based on the provided topic. Use this tool when the user asks for social
    media posts or asks about promoting the episode.`,
  inputSchema: z.object({
    topic: z.string().describe("The topic of the episode"),
  }),
  execute: async ({ topic }) => {
    console.log("🎯 social media tool called");
    return await socialMediaObject(topic);
  },
});
