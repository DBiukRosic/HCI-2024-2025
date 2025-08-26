import { Post } from "../page";

// Dynamic segment: /find_our_shops/[postId]
type Params = { postId: string };

// Query params: ?highlight=true
type Query = { highlight?: string };

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${BASE_API_URL}/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
  return res.json();
}

export default async function FindOurShopsPost({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Promise<Query> | Query;
}) {
  const { postId } = await params;
  const q = await searchParams;          
  const highlight = q?.highlight === "true";

  const post = await getPost(postId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-urbanist-bold p-10 capitalize">
        <span className="text-neutral-400">Post {post.id}:</span>{" "}
        {highlight ? <mark>{post.title}</mark> : post.title}
      </h1>
      <p className="text-xl p-10">{post.body}</p>
    </main>
  );
}


