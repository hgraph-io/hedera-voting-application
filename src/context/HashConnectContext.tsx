'use client';

import { useReducer, useEffect, createContext, useContext } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { HashConnect, HashConnectTypes } from 'hashconnect';

const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK;
if (!network)
  throw new Error('Error: Missing NEXT_PUBLIC_HEDERA_NETWORK in environment variables');

const appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Voting Application',
  description: 'Voting Application Created By Hedera',
  icon: 'https://uploads-ssl.webflow.com/634077443e3c357eec6a40fe/64444f46f7fdec1bfe8a1511_logo-twitter4-p-500.png',
};

enum HashconnectEvents {
  FoundExtensionEvent = 'foundExtensionEvent',
  FoundIframeEvent = 'foundIframeEvent',
  PairingEvent = 'pairingEvent',
  TransactionEvent = 'transactionEvent',
  AcknowledgeMessageEvent = 'acknowledgeMessageEvent',
  AdditionalAccountRequestEvent = 'additionalAccountRequestEvent',
  ConnectionStatusChangeEvent = 'connectionStatusChangeEvent',
  AuthRequestEvent = 'authRequestEvent',
  SignRequestEvent = 'signRequestEvent',
}

type HashConnectContext = {
  [key in HashconnectEvents]?: unknown;
} & {
  client?: HashConnect;
  initData?: HashConnectTypes.InitilizationData;
  // todo:
  provider?: any;
  signer?: any;
  accountId?: number;
};

const HashpackContext = createContext<HashConnectContext>({});

export function useHashConnect() {
  return useContext(HashpackContext);
}

function reducer(state: object, action: { type: string; payload: unknown }) {
  switch (action.type) {
    default:
      // store last action
      return { ...state, [action.type]: action.payload };
  }
}

function Router({ children }: { children: React.ReactNode }) {
  const hc = useHashConnect();
  const pathname = usePathname();

  switch (hc?.connectionStatusChangeEvent) {
    // case HashConnectConnectionState.Paired:
    case 'Paired':
      if (pathname === '/admin') redirect('/admin/dashboard');

    default:
      //TODO: handle not paired on other routes
    // if (pathname !== '/admin') redirect('/admin');
  }
  return <>{children}</>;
}

export default function HashConnectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  const pathname = usePathname();
  /*
   * Initialize HashConnect client
   */
  useEffect(() => {
    if (!pathname.startsWith('/admin')) return;
    async function init() {
      const client = new HashConnect();

      /*
       * Register event listeners
       */

      for (const event of Object.values(HashconnectEvents)) {
        //@ts-ignore
        client[event].on((data) => {
          dispatch({ type: event, payload: data });
        });
      }

      /*
       * Initialize application
       */
      const initData = await client.init(
        appMetadata,
        process.env.NEXT_PUBLIC_HEDERA_NETWORK as 'testnet' | 'mainnet',
        true
      );

      dispatch({ type: 'initData', payload: initData });

      dispatch({ type: 'client', payload: client });

      /*
       * Get provider and signer
       */
      const accountId = initData.savedPairings[0]?.accountIds[0];

      // const accountId = '0.0.3579797'; // test with different account
      if (accountId) {
        dispatch({ type: 'accountId', payload: accountId });
        const provider = client.getProvider(network!, initData.topic, accountId);
        const signer = client.getSigner(provider);
        dispatch({
          type: 'provider',
          payload: provider,
        });
        dispatch({
          type: 'signer',
          payload: signer,
        });
      }
    }

    if (!state.client) init();
    // for debugging
    // @ts-ignore
    window.hc = state;
  }, [pathname, state]);

  return (
    <HashpackContext.Provider value={state}>
      <Router>{children}</Router>
    </HashpackContext.Provider>
  );
}
