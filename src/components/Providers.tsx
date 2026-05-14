'use client';

import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { arbitrumSepolia, mainnet, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
const config = getDefaultConfig({
  appName: 'CipherSage',
  projectId: 'fhenix-quest-placeholder',
  chains: [arbitrumSepolia, mainnet, arbitrum, base],
  ssr: true,
});

const queryClient = new QueryClient();

const fhenixTheme = darkTheme({
  accentColor: '#7B3FE4',
  accentColorForeground: 'white',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={fhenixTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
