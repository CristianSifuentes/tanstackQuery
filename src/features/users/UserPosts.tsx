import { useQuery } from "@tanstack/react-query";
import { api, Endpoints } from "../../api/client";
import type { Post } from "../../api/types";

export default function UserPosts({userId}: {userId: number | null}) {

  const enabled = !!userId;
  const { data, isPending } = useQuery({
    queryKey: ['posts', userId, 'posts'],
    queryFn:  async () =>  {
      const res = await fetch(Endpoints.userPosts(userId!))
      return res.json() as Promise<Post[]>
    },
    enabled,
    staleTime: 10_000, // 10 seconds
    // suspense: false
  });

  if (!enabled) return <div>Select a user to see their posts</div>;
  if (isPending) return <div>Loading posts…</div>;
  if (!data || data.length === 0) return <div>No posts found for this user.</div>;
  
  return (
    <div>
      <h4>Posts by User {userId}</h4>
      <ol>
        {
          data.map(post => (
            <li key={post.id}>
              <strong>{post.title}</strong>
            </li>
          ))}
        
      </ol>
    </div>
  )
}
