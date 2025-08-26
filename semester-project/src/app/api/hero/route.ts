import { NextResponse } from "next/server";
import { createClient } from "contentful";

// (Optional) force Node runtime (not Edge)
export const runtime = "nodejs";

export async function GET() {
  // Read env at request time (not at module top)
  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;

  // Debug: return what we see (booleans only)
  if (!space || !token) {
    return NextResponse.json(
      {
        error: "Missing Contentful env vars",
        hasSpace: !!space,
        hasToken: !!token,
      },
      { status: 500 }
    );
  }

  // Create client only after confirming env vars exist
  const client = createClient({ space, accessToken: token });

  try {
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

    return NextResponse.json({ ok: true, count: images.length, images });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error calling Contentful" },
      { status: 500 }
    );
  }
}
