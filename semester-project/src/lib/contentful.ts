import { createClient, type Asset, } from "contentful";

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

// Helper to extract URL from Contentful Asset field, handling localization
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

// Skeleton types for Contentful entries
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

type TeamMemberSkeleton = {
  contentTypeId: "teamMember";
  fields: {
    name: string;
    position: string;
    bio?: string;
    avatar: Asset;
  };
};

type StatSkeleton = {
  contentTypeId: "stat";
  fields: {
    label: string;
    value: number;
    suffix?: string;
  };
};

// Normalized types for app use
export type TeamMemberDTO = {
  name: string;
  position: string;
  bio?: string;
  avatarUrl: string;
};

export type StatDTO = {
  id: string; 
  label: string;
  value: number;
  suffix?: string;
};

// Fetchers
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

export async function getTeamMembers(): Promise<TeamMemberDTO[]> {
  const res = await contentful.getEntries<TeamMemberSkeleton>({
    content_type: "teamMember",
  });
  

  return res.items.map((entry) => {
    const url = getAssetUrl((entry.fields.avatar as Asset).fields.file);
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




