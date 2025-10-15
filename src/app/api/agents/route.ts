import { titlesObject } from "./objects/titles";
import { outlineObject } from "./objects/outline";
import { socialMediaObject } from "./objects/socialMedia";

// Set the maximum duration for this function
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  const { topic }: { topic?: string } = await request.json();

  if (!topic) {
    return new Response("Topic is required", { status: 400 });
  }

  // Generate content in parallel
  const [titleContent, outlineContent, socialMediaContent] = await Promise.all([
    titlesObject(topic),
    outlineObject(topic),
    socialMediaObject(topic),
  ]);

  const content = [titleContent, outlineContent, socialMediaContent];

  return Response.json({ content });
}
