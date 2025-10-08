import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Endpoints, api } from '../../api/client';
import type { Todo } from '../../api/types';
import { useState } from 'react';

export default function Todos() {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => api<Todo[]>(Endpoints.todos),
  });

  const createTodo = useMutation({
    mutationFn: (title: string) =>
      api<Todo>(Endpoints.createTodo, {
        method: 'POST',
        body: JSON.stringify({ title, completed: false, userId: 1 })
      }),
    onMutate: async (newTitle) => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const prev = qc.getQueryData<Todo[]>(['todos']) || [];
      const optimistic: Todo = {
        id: Math.floor(Math.random() * 100000) + 10000,
        title: newTitle,
        completed: false,
      };
      qc.setQueryData<Todo[]>(['todos'], [optimistic, ...prev]);
      setTitle('');
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['todos'], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });

  const toggleTodo = useMutation({
    mutationFn: (todo: Todo) =>
      api<Todo>(Endpoints.toggleTodo(todo.id), {
        method: 'PATCH',
        body: JSON.stringify({ completed: !todo.completed })
      }),
    onMutate: async (todo) => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const prev = qc.getQueryData<Todo[]>(['todos']) || [];
      qc.setQueryData<Todo[]>(['todos'], prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ));
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['todos'], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });

  if (todosQuery.isPending) return <p>Loading todos…</p>;
  if (todosQuery.error) return <p style={{ color: 'crimson' }}>Error loading todos</p>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) createTodo.mutate(title.trim());
        }}
        className="flex"
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo…" />
        <button type="submit" disabled={createTodo.isPending}>Add</button>
      </form>

      <ul>
        {todosQuery.data!.map((t) => (
          <li key={t.id}>
            <label className="flex">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo.mutate(t)}
              />
              <span style={{ opacity: t.completed ? 0.6 : 1 }}>
                {t.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
