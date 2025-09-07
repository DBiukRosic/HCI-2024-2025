// src/lib/contentful.ts
import { createClient, type Asset } from "contentful";

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

/** ---------- helpers ---------- */
function getAssetUrl(fileField: unknown): string | undefined {
  // Non-localized: { url: string }
  if (
    fileField &&
    typeof fileField === "object" &&
    "url" in (fileField as Record<string, unknown>) &&
    typeof (fileField as { url?: unknown }).url === "string"
  ) {
    return (fileField as { url?: string }).url;
  }
  // Localized: { [locale]: { url: string } }
  if (fileField && typeof fileField === "object") {
    const first = Object.values(fileField as Record<string, { url?: string }>)[0];
    if (first && typeof first.url === "string") return first.url;
  }
  return undefined;
}
function normalizeUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

/** ---------- existing skeletons ---------- */
type BlogPostSkeleton = {
  contentTypeId: "blogPost";
  fields: {
    title: string;
    slug: string;
    description?: string;
  };
};

type HeroSectionSkeleton = {
  contentTypeId: "heroSection";
  fields: { images: Asset[] };
};

/** ---------- new skeletons ---------- */
type TeamMemberSkeleton = {
  contentTypeId: "teamMember";
  fields: {
    name: string;
    position: string; // <-- matches your field
    bio?: string;
    avatar: Asset; // Asset type from contentful, which has 'fields'
  };
};

type StatSkeleton = {
  contentTypeId: "stat";
  fields: {
    label: string; // <-- matches your field
    value: number;
    suffix?: string;
  };
};

/** ---------- DTOs for your UI ---------- */
export type TeamMemberDTO = {
  name: string;
  position: string;
  bio?: string;
  avatarUrl: string; // normalized https
};

export type StatDTO = {
  id: string; 
  label: string;
  value: number;
  suffix?: string;
};

/** ---------- existing fetchers ---------- */
export async function getBlogPosts() {
  const entries = await contentful.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
  });
  return entries.items;
}

export async function getHeroImages() {
  const res = await contentful.getEntries<HeroSectionSkeleton>({
    content_type: "heroSection",
    limit: 1,
  });
  const hero = res.items[0];
  const images: Asset[] = hero?.fields?.images ?? [];

  return images.map((img) => {
    const url = getAssetUrl(img.fields.file);
    return {
      image: normalizeUrl(url),
      borderRadius: "10% 10% 10% 10%",
    };
  });
}

/** ---------- new fetchers ---------- */
export async function getTeamMembers(): Promise<TeamMemberDTO[]> {
  const res = await contentful.getEntries<TeamMemberSkeleton>({
    content_type: "teamMember",
  });
  

  return res.items.map((entry) => {
    const url = getAssetUrl(entry.fields.avatar.fields.file);
    // Request a 256x256 square thumbnail (Contentful will transform; Next will still optimize)
    const avatar = normalizeUrl(url) + "?w=256&h=256&fit=thumb&f=face&fm=webp";
    return {
      name: entry.fields.name,
      position: entry.fields.position,
      bio: entry.fields.bio,
      avatarUrl: avatar,
    };
  });
}

export async function getStats(): Promise<StatDTO[]> {
  const res = await contentful.getEntries<StatSkeleton>({
    content_type: "stat",
  });

  return res.items.map((entry) => ({
    id: entry.sys.id,
    label: entry.fields.label,
    value: entry.fields.value,
    suffix: entry.fields.suffix,
  }));
}




