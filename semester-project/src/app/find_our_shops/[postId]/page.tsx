import { Post } from "../page";

type Params = { postId: string };

type FindOurShopsPostProps = { params: Params };

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${BASE_API_URL}/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
  return res.json();
};
export default async function FindOurShopsPost(
  { params }: FindOurShopsPostProps
) {
  const { postId } = params;
  const post = await getPost(postId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-urbanist-bold p-10 capitalize">
        <span className="text-neutral-400">Post {post.id}:</span> {post.title}
      </h1>
      <p className="text-xl p-10">{post.body}</p>
    </main>
  );
}
