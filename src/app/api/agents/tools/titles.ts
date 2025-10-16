import { tool } from "ai";
import z from "zod";
import { titlesObject } from "../functions/titles";

export const titles = tool({
  name: "generate-titles",
  description: `Suggests concise, compelling podcast episode title options
    based on provided topic. Use this tool when the user asks for title ideas. Returns strict JSON, no extra text.`,
  inputSchema: z.object({
    topic: z.string().describe("The topic of the episode"),
  }),
  execute: async ({ topic }) => {
    console.log("🎯 titles tool called");
    return await titlesObject(topic);
  },
});
