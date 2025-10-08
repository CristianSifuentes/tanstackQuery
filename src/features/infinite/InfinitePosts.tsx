import { useInfiniteQuery } from '@tanstack/react-query';
import { Endpoints } from '../../api/client';

type Post = { id: number; title: string; body: string };

export default function InfinitePosts() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infinite-posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(Endpoints.infinitePosts(pageParam));
      const items = (await res.json()) as Post[];
      return { items, nextPage: items.length === 10 ? pageParam + 1 : undefined };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 10_000,
  });

  if (isPending) return <p>Loading infinite posts…</p>;
  if (error) return <p style={{ color: 'crimson' }}>Error loading: {(error as Error).message}</p>;

  return (
    <div>
      <ol>
        {data!.pages.flatMap((p) => p.items).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more…' : hasNextPage ? 'Load more' : 'No more'}
      </button>
    </div>
  );
}