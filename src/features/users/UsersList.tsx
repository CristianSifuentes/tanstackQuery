import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, Endpoints } from '../../api/client';
import type { User } from '../../api/types';

export default function UsersList({ onSelect }: { onSelect: (id: number) => void }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isFetching } = useQuery({
    queryKey: ['users', page],
    queryFn: () => api<User[]>(Endpoints.users(page)),
    placeholderData: (prev) => prev,
  });

  return (
    <div>
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <h4>Users — page {page}</h4>
        {isFetching && <small>Fetching…</small>}
      </div>

      {isPending ? (
        <p>Loading users…</p>
      ) : (
        <ul>
          {data!.map((u) => (
            <li key={u.id}>
              <button onClick={() => onSelect(u.id)}>{u.name}</button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
