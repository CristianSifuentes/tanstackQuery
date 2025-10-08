import { Suspense, useState } from 'react';
import RepoStats from './features/basic/RepoStats';
import UsersList from './features/users/UsersList';
import UserPosts from './features/users/UserPosts';
import Todos from './features/todos/Todos';
import PrefetchLink from './features/shared/PrefetchLink';
import InfinitePosts from './features/infinite/InfinitePosts';
import { queryClient } from './lib/queryClient';
import { Endpoints } from './api/client';

export default function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div>
      <h1>TanStack Query v5 — Basic → Medium Demo</h1>
      <p className="small">Devtools are enabled (open the bottom panel icon).</p>

      <section>
        <h2>1) Basic useQuery (GitHub repo)</h2>
        <RepoStats />
      </section>

      <section>
        <h2>2) Pagination with placeholderData (keepPreviousData-like)</h2>
        <UsersList onSelect={(id) => setSelectedUserId(id)} />
        <div style={{ marginTop: 8 }}>
          {selectedUserId && (
            <PrefetchLink
              label="Prefetch this user's posts →"
              prefetch={() =>
                queryClient.prefetchQuery({
                  queryKey: ['user', selectedUserId, 'posts'],
                  queryFn: async () => {
                    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`);
                    return res.json();
                  },
                  // staleTime: 10_000
                })
              }
            />
          )}
        </div>
      </section>

      <section>
        <h3>3) Dependent query (User → Posts) + Suspense</h3>
        <Suspense fallback={<p>Loading posts…</p>}>
          <UserPosts userId={selectedUserId} />
        </Suspense>
      </section>

      <section>
        <h2>4) Mutations + optimistic updates (Todos)</h2>
        <Todos />
      </section>

      <section>
        <h2>5) useInfiniteQuery (infinite scrolling)</h2>
        <InfinitePosts />
      </section>
    </div>
  );
}
