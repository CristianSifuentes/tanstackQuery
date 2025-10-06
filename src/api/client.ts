export async function api<T>(url: string, init?: RequestInit): Promise<T> {
    // const response = await fetch(url, init);
    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }
    // const data = await response.json();
    // return data as T;

    const res = await fetch(url, { 
        headers: { 'Content-Type': 'application/json',
        ...(init?.headers || {})},
        ...init,     
    });
    if (!res.ok) {
        // throw new Error('Network response was not ok');
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json() as Promise<T>;

}


export const Endpoints={
  repo: 'https://api.github.com/repos/TanStack/query',
  users: (page = 1) => `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=20`,
  userPosts: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  todos: 'https://jsonplaceholder.typicode.com/todos?_limit=10',
  createTodo: 'https://jsonplaceholder.typicode.com/todos',
  toggleTodo: (id: number) => `https://jsonplaceholder.typicode.com/todos/${id}`,
  infinitePosts: (page = 1) => `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
};