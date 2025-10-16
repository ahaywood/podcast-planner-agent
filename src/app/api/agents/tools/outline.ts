import { tool } from "ai";
import z from "zod";
import { outlineObject } from "../functions/outline";

export const outline = tool({
  name: "generate-outline",
  description: `This tool generates a podcast outline based on the provided
    topic. Use this tool when the user asks for an outline or is trying to plan
    the content of the episode.`,
  inputSchema: z.object({
    topic: z.string().describe("The topic of the episode"),
  }),
  execute: async ({ topic }) => {
    console.log("🎯 outline tool called");
    return await outlineObject(topic);
  },
});
