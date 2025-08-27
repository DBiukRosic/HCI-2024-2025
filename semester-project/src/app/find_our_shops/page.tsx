import Link from "next/link";
import clsx from "clsx";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Pagination {
  limit: number;
  page: number;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPosts = async (
  pagination: Pagination = { limit: 9999, page: 1 }
): Promise<Post[]> => {
  const res = await fetch(
    `${BASE_API_URL}/posts?_limit=${pagination.limit}&_page=${pagination.page}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const getTotalPosts = async (): Promise<number> => {
  const res = await fetch(`${BASE_API_URL}/posts?_limit=1`, {
    method: "HEAD",
    cache: "no-store",
  });
  const raw = res.headers.get("x-total-count") || "1";
  return Number.parseInt(raw, 10);
};

// Helper to coerce query values (string|string[]|undefined) -> number with default
function toNum(
  v: string | string[] | undefined,
  fallback: number
): number {
  const s = Array.isArray(v) ? v[0] : v;
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default async function FindOurShops({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;                 // <-- await the promise
  const pageSize = toNum(q._limit, 10);
  const page = toNum(q._page, 1);

  const totalPosts = await getTotalPosts();
  const totalPages = Math.max(1, Math.ceil(totalPosts / pageSize));

  const posts = await getPosts({ limit: pageSize, page });

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-urbanist-bold p-10">Locations of our shops</h1>

      <div className="flex items-baseline gap-8 pb-10">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-4">
          <Link
            href={{ pathname: "/find_our_shops", query: { _page: 1, _limit: pageSize } }}
            className="rounded border bg-gray-100 px-3 py-1 text-gray-800 font-urbanist"
          >
            First
          </Link>
          <Link
            href={{
              pathname: "/find_our_shops",
              query: { _page: Math.max(1, page - 1), _limit: pageSize },
            }}
            className={clsx(
              "rounded border bg-gray-100 px-3 py-1 text-gray-800 font-urbanist",
              page === 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
          <Link
            href={{
              pathname: "/find_our_shops",
              query: { _page: Math.min(totalPages, page + 1), _limit: pageSize },
            }}
            className={clsx(
              "rounded border bg-gray-100 px-3 py-1 text-gray-800 font-urbanist",
              page === totalPages && "pointer-events-none opacity-50"
            )}
          >
            Next
          </Link>
          <Link
            href={{
              pathname: "/find_our_shops",
              query: { _page: totalPages, _limit: pageSize },
            }}
            className="rounded border bg-gray-100 px-3 py-1 text-gray-800 font-urbanist"
          >
            Last
          </Link>
        </div>
      </div>

      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/find_our_shops/${post.id}`}>
              <span className="text-2xl text-purple-500">Post {post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
