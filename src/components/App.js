import { QueryClient, QueryClientProvider } from 'react-query';
import { LaunchesPage } from './launches-page';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="is-size-1 block">🚀 SpaceX Monitoring</h1>
      <LaunchesPage />
    </QueryClientProvider>
  );
}
