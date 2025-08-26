// app/page.tsx  (no "use client")
import { createClient } from "contentful";

export default async function Page() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });
  const res = await client.getEntries({ content_type: "heroSection" });

  const images = (res.items[0]?.fields?.images ?? []).map((img: any) => ({
    url: "https:" + img.fields.file.url,
    width: img.fields.file.details.image.width,
    height: img.fields.file.details.image.height,
    title: img.fields.title ?? "Hero image",
    borderRadius: "15% 15% 15% 15%",
  }));

  return <HeroImagesClient images={images} />; // client child takes plain data
}
