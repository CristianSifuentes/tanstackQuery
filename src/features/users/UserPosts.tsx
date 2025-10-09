import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Endpoints } from '../../api/client';
import type { Post } from '../../api/types';

export default function UserPosts({ userId }: { userId: number | null }) {
  const enabled = !!userId;

  // const { data, isPending } = useQuery({
  //   queryKey: ['user', userId, 'posts'],
  //   queryFn: async () => {
  //     const res = await fetch(Endpoints.userPosts(userId!));
  //     return res.json() as Promise<Post[]>;
  //   },
  //   enabled,
  //   staleTime: 10_000,
  //   suspense: true,
  // });

   const { data, isPending } = useSuspenseQuery({
    queryKey: ['user', userId, 'posts'],
    queryFn: async () => {
      const res = await fetch(Endpoints.userPosts(userId!));
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json() as Promise<Post[]>;
    },
    staleTime: 10_000,
  });

  if (!enabled) return <p>Select a user to load posts…</p>;
  if (isPending) return <p>Loading posts…</p>;

  return (
    <div>
      <h4>Posts for user {userId}</h4>
      <ol>
        {data!.slice(0, 5).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ol>
    </div>
  );
}
