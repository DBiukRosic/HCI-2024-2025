import { createClient, type Asset } from "contentful";

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

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
  fields: {
    images: Asset[];
  };
};

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
    const fileField = img.fields.file as
      | { url?: string }
      | Record<string, { url?: string }>
      | undefined;

    let url: string | undefined;
    if (fileField && "url" in fileField) {
      const possibleUrl = fileField.url;
      url = typeof possibleUrl === "string" ? possibleUrl : undefined;
    } else if (fileField) {
      const first = Object.values(fileField)[0];
      const possibleUrl = first?.url;
      url = typeof possibleUrl === "string" ? possibleUrl : undefined;
    }

    return {
      image: url?.startsWith("//") ? `https:${url}` : (url ?? ""),
      borderRadius: "10% 10% 10% 10%",
    };
  });
}



