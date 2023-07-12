'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HashConnectTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';
import Client from './hashconnect';

const HashpackContext = createContext<Client | null>(null);

export function useHashpack() {
  return useContext(HashpackContext);
}

const whitelist = ['0.0.3541877'];

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<Client | null>(null);
  const [status, setStatus] = useState<HashConnectConnectionState>(
    HashConnectConnectionState.Connecting
  );
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const client = new Client();
    client.hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      console.log('hiiiiiiiiiiiiiiiiiiii');
      console.log(connectionStatus);
      setStatus(connectionStatus);
    });
    client.init();
    setClient(client);
    // for debugging
    //@ts-ignore
    window.hc = client.hashconnect;
  }, []);

  console.log(client);

  const pairedWhitelistAccounts =
    client?.hashconnect?.hcData.pairingData[0]?.accountIds.filter((id) =>
      whitelist.includes(id)
    ) || [];

  // if  no whitelist accounts paired, go to login page
  if (!pairedWhitelistAccounts.length && !pathname.startsWith('/admin/login')) {
    router.push('/admin/login');
    // redirect to dashboard after pairing
  } else if (pairedWhitelistAccounts.length && pathname.startsWith('/admin/login')) {
    // router.push('/admin/dashboard');
  }

  return (
    <HashpackContext.Provider value={client}>{client && children}</HashpackContext.Provider>
  );
}
