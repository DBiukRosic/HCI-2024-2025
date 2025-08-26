import { NextResponse } from "next/server";
import { createClient, type Asset } from "contentful";

export const runtime = "nodejs";

// Contentful skeleton for your entry
type HeroSectionSkeleton = {
  contentTypeId: "heroSection";
  fields: {
    images: Asset[]; // multiple Assets
  };
};

type ImageDTO = {
  url: string;
  title: string;
  borderRadius: string;
};

function normalizeUrl(url?: string): string {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

export async function GET() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  // Ask for the hero entry
  const res = await client.getEntries<HeroSectionSkeleton>({
    content_type: "heroSection",
    limit: 1,
  });

  const hero = res.items[0];

  // ✅ Narrow images to Asset[] first (fixes “map on never”)
  const imagesArr: Asset[] = hero?.fields?.images ?? [];

  const images: ImageDTO[] = imagesArr.map((img) => {
    // file can be localized; pick the first locale if needed
    const fileField = img.fields.file as
      | { url?: string }
      | Record<string, { url?: string }>
      | undefined;

    let url: string | undefined;
    if (fileField && "url" in fileField) {
      url = typeof fileField.url === "string" ? fileField.url : undefined;
    } else if (fileField) {
      const first = Object.values(fileField)[0];
      url = first?.url;
    }

    return {
      url: normalizeUrl(url),
      title: (img.fields.title as string) ?? "Hero image",
      borderRadius: "10% 10% 10% 10%",
    };
  });

  return NextResponse.json({ ok: true, count: images.length, images });
}



