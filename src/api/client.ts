export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const Endpoints = {
  repo: 'https://api.github.com/repos/TanStack/query',
  users: (page = 1) => `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`,
  userPosts: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  todos: 'https://jsonplaceholder.typicode.com/todos?_limit=10',
  createTodo: 'https://jsonplaceholder.typicode.com/todos',
  toggleTodo: (id: number) => `https://jsonplaceholder.typicode.com/todos/${id}`,
  infinitePosts: (page = 1) => `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
};