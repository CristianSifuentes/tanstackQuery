export type GithubRepo = {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
};

export type User = { id: number; name: string; username: string; email: string; };
export type Post = { id: number; userId: number; title: string; body: string; };

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
};
