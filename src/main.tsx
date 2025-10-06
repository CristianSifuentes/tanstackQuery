import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { queryClient } from './lib/queryClient.ts'
import App from './App.tsx'
import './styles.css';

import {  
// useQuery, 
// useMutation,
// useQueryClient,
// QueryClient, 
QueryClientProvider

} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <main>
        <App />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
