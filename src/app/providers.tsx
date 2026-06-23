'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { UserSync } from '@/components/UserSync';


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ['google', 'apple'],
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
        },
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      <UserSync />
      {children}
    </PrivyProvider>
  );
}
