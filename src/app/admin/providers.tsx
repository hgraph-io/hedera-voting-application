// @ts-nocheck
'use client';

import { useState, useReducer, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';

const appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Voting Application',
  description: 'Voting Application Created By Hedera',
  icon: 'https://uploads-ssl.webflow.com/634077443e3c357eec6a40fe/64444f46f7fdec1bfe8a1511_logo-twitter4-p-500.png',
};

const whitelist = ['0.0.3541877'];

const HashpackContext = createContext<{ client?: HashConnect }>({});

export function useHashpack() {
  return useContext(HashpackContext);
}

const hashconnectEvents = [
  'foundExtensionEvent',
  'foundIframeEvent',
  'pairingEvent',
  'transactionEvent',
  'acknowledgeMessageEvent',
  'additionalAccountRequestEvent',
  'connectionStatusChangeEvent',
  'authRequestEvent',
  'signRequestEvent',
];

function reducer(state, action) {
  switch (action.type) {
    // case 'pairingEvent':
    //   console.log(action);
    //   return state;
    // return {
    //   ...state,
    //   connectionState: action.payload,
    // };
    default:
      console.log(action);
      // store last action
      return { ...state, [action.type]: action.payload };
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});

  const pathname = usePathname();
  const router = useRouter();

  /*
   * Initialize HashConnect client
   */
  useEffect(() => {
    async function init() {
      const client = new HashConnect();

      /*
       * Register event listeners
       */

      for (const event of hashconnectEvents) {
        //@ts-ignore
        client[event].on((data) => {
          dispatch({ type: event, payload: data });
        });
      }

      /*
       * Get provider and signer
       */

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

      // for debugging
      // @ts-ignore
      window.hc = client;
    }
    init();
  }, []);

  // const pairedWhitelistAccounts =
  //   client?.hashconnect?.hcData.pairingData[0]?.accountIds.filter((id) =>
  //     whitelist.includes(id)
  //   ) || [];

  // if  no whitelist accounts paired, go to login page
  // if (!pairedWhitelistAccounts.length && !pathname.startsWith('/admin/login')) {
  //   router.push('/admin/login');
  //   // redirect to dashboard after pairing
  // } else if (pairedWhitelistAccounts.length && pathname.startsWith('/admin/login')) {
  //   // router.push('/admin/dashboard');
  // }

  return <HashpackContext.Provider value={state}>{children}</HashpackContext.Provider>;
}
