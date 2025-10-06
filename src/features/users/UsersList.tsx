import { useState } from "react";
import type { User } from "../../api/types";
import { api, Endpoints } from "../../api/client";
import { useQuery } from "@tanstack/react-query";

export default function UsersList({onSelect}: {onSelect:(id: number) => void}) {
  const [page, setPage] = useState(1);

  const { data, isPending, isFetching } = useQuery({
    queryKey: ['users', page],
    queryFn: () => api<User[]>(Endpoints.users(page)),
    placeholderData: (prev) => prev,
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (!data) return <div>No data</div>;

  return (
    <div>

      <div className="flex" style={{justifyContent: 'space-between'}}>
        <h4>Users - page {page}</h4>
        {isFetching ? <span>Updating…</span> : null}

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
        <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage((old) => old + 1)}>Next</button>

      </div>



    </div>
  )
}
