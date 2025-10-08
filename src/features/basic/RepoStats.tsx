import { useQuery } from '@tanstack/react-query';
import { api, Endpoints } from '../../api/client';
import type { GithubRepo } from '../../api/types';

export default function RepoStats() {
  const { data, error, isPending, isRefetching, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => api<GithubRepo>(Endpoints.repo),
  });

  if (isPending) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'crimson' }}>Error: {(error as Error).message}</p>;

  return (
    <div className="grid">
      <strong>{data!.name}</strong>
      <p>{data!.description}</p>
      <div className="flex">
        <span>👀 {data!.subscribers_count}</span>
        <span>✨ {data!.stargazers_count}</span>
        <span>🍴 {data!.forks_count}</span>
        <button onClick={() => refetch()} disabled={isRefetching}>
          {isRefetching ? 'Refreshing…' : 'Manual refetch'}
        </button>
      </div>
    </div>
  );
}