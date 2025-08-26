import { NextResponse } from "next/server";
import { createClient } from "contentful";

export async function GET() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string, // Delivery API key
  });

  const res = await client.getEntries({ content_type: "heroSection" });
  const hero = res.items[0];

  const images =
    (hero?.fields?.images as any[] | undefined)?.map((img) => ({
      url: "https:" + img.fields.file.url,
      width: img.fields.file.details.image.width,
      height: img.fields.file.details.image.height,
      title: img.fields.title ?? "Hero image",
      borderRadius: "10% 10% 10% 10%",
    })) ?? [];

  return NextResponse.json(images);
}
