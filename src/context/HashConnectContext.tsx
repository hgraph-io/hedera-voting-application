//@ts-nocheck
'use client';

import { useReducer, useEffect, createContext, useContext } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { useSnackbar } from '@/context';
import { SnackbarMessageSeverity } from '@/types';

const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK!;
const votingAdmins = JSON.parse(process.env.NEXT_PUBLIC_HEDERA_VOTING_ADMINS!);

const appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Voting Application',
  description: 'Voting Application Created By Hedera',
  icon: 'https://uploads-ssl.webflow.com/634077443e3c357eec6a40fe/64444f46f7fdec1bfe8a1511_logo-twitter4-p-500.png',
};

enum HashConnectEvents {
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
  [key in HashConnectEvents]?: unknown;
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

function reducer(state: HashConnectContext | {}, action: { type: string; payload: unknown }) {
  console.log(action);
  switch (action.type) {
    case HashConnectEvents.PairingEvent: {
      //@ts-ignore
      const accountId = action?.payload?.accountIds[0];
      //@ts-ignore
      const provider = state?.client?.getProvider(network, action.payload.topic, accountId);
      //@ts-ignore
      const signer = provider ? state?.client?.getSigner(provider) : undefined;

      return {
        ...state,
        [action.type]: action.payload,
        accountId,
        provider,
        signer,
      };
    }
    case 'initData': {
      //@ts-ignore
      const accountId = action?.payload?.savedPairings[0]?.accountIds[0];
      //@ts-ignore
      const provider = state.client.getProvider(network, action.payload.topic, accountId);
      //@ts-ignore
      const signer = state.client.getSigner(provider);

      return {
        ...state,
        [action.type]: action.payload,
        accountId,
        provider,
        signer,
      };
    }
    case HashConnectEvents.ConnectionStatusChangeEvent: {
      // happens when a user connects to hashconnect but is not paired
      if (action.payload === 'Connected')
        return {
          ...state,
          [action.type]: action.payload,
          accountId: undefined,
          provider: undefined,
          signer: undefined,
        };
    }
    default:
      // store last action
      return { ...state, [action.type]: action.payload };
  }
}

export default function HashConnectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  const pathname = usePathname();
  const { openSnackbar } = useSnackbar();
  /*
   * Initialize HashConnect client
   */
  useEffect(() => {
    if (!pathname.startsWith('/admin') || state.client) return;
    console.log('state.client');
    console.log(state.client);

    const client = new HashConnect();
    // need initial client in some events before dispatching client after client.init()
    dispatch({ type: 'client', payload: client });

    /*
     * Register event listeners
     */
    for (const event of Object.values(HashConnectEvents)) {
      //@ts-ignore
      client[event].on((data) => {
        dispatch({ type: event, payload: data });
      });
    }

    /*
     * Initialize application
     */
    client
      .init(appMetadata, process.env.NEXT_PUBLIC_HEDERA_NETWORK as 'testnet' | 'mainnet', true)
      .then((initData) => {
        dispatch({ type: 'initData', payload: initData });
      });
  }, [pathname, state.client]);

  /*
   * If an account is paired but it is not in the voting admin, show error message, disconnect, and redirect to admin login
   */
  if (state.accountId && !votingAdmins.includes(state.accountId)) {
    state.client?.disconnect();
    if (pathname === '/admin')
      // @ts-ignore
      openSnackbar(
        'Sorry, this Hedera account is not an admin. Please contact the project coordinator to vote on panelists.',
        SnackbarMessageSeverity.Error
      );
    // success: redirect to dashboard if on login page with valid voting id
  } else if (state.accountId && votingAdmins.includes(state.accountId) && pathname === '/admin')
    redirect('/admin/dashboard');
  // redirect to admin login if an account is not paired
  else if (
    pathname !== '/admin' &&
    state?.connectionStatusChangeEvent &&
    state.connectionStatusChangeEvent !== 'Paired'
  )
    redirect('/admin');

  console.log(state?.connectionStatusChangeEvent);

  return <HashpackContext.Provider value={state}>{children}</HashpackContext.Provider>;
}
