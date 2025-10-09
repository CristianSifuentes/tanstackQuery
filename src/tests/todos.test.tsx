import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Todos from '../features/todos/Todos';
import { withQueryClient } from './test-utils';

const originalFetch = global.fetch;

describe('Todos (React Query)', () => {
  beforeEach(() => {
    global.fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes('/todos?_limit=10')) {
        return Promise.resolve(new Response(JSON.stringify([
          { id: 1, title: 'First', completed: false }
        ])));
      }
      if (url.endsWith('/todos') && init?.method === 'POST') {
        return Promise.resolve(new Response(JSON.stringify({
          id: 999, title: 'New', completed: false
        })));
      }
      if (url.includes('/todos/') && init?.method === 'PATCH') {
        return Promise.resolve(new Response(JSON.stringify({})));
      }
      return Promise.resolve(new Response('{}', { status: 404 }));
    }) as any;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders and can add a todo (optimistic)', async () => {
    const { ui, Wrapper } = withQueryClient(<Todos />);
    render(ui, { wrapper: Wrapper });

    expect(await screen.findByText('First')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('New todo…') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Write tests' } });
    fireEvent.submit(input.closest('form')!);

    expect(await screen.findByText(/Write tests/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });
  });
});
