import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SubscriptionProvider } from './context/SubscriptionContext';

export default function App() {
  return (
    <SubscriptionProvider>
      <RouterProvider router={router} />
    </SubscriptionProvider>
  );
}

