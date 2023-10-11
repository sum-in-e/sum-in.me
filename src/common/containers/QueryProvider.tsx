'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {},
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const isDev = process.env.NEXT_PUBLIC_MODE === 'development';

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
export default QueryProvider;
