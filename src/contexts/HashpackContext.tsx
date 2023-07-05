import { createContext, useContext, useState, useEffect } from 'react';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { HashpackAccount } from '@/types';

const HashpackContext = createContext<HashpackAccount | undefined>(undefined);

export const useHashpack = () => useContext(HashpackContext);

export default function HashpackProvider({ children }: { children: React.ReactNode }) {
  const [accountId, setAccountId] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hashpackTopicId, setHashpackTopicId] = useState<string | undefined>(undefined);
  const hashconnect = new HashConnect();

  const disconnectHashpack = async () => {
    if (hashpackTopicId) {
      await hashconnect.disconnect(hashpackTopicId);
      setAccountId('');
      setConnected(false);
    }
  };

  const initWalletConnect = async (firstLoad: boolean) => {
    setLoading(true);

    let appMetadata: HashConnectTypes.AppMetadata = {
      name: 'Hedera Voting Application',
      description: 'Voting Application Created By Hedera',
      icon: 'https://launch.turtlemoon.io/_next/static/media/default-profile-picture.75ccdb8e.png',
    };

    let initData = await hashconnect.init(appMetadata, 'testnet', false);
    let topic = initData.savedPairings[0] ? initData.savedPairings[0].topic : initData.topic;
    let pairingString = initData.pairingString;

    setHashpackTopicId(topic);

    hashconnect.pairingEvent.on(async (pairingData) => {
      if (pairingData.accountIds) {
        setAccountId(pairingData.accountIds[0]);
        setConnected(true);
      }
    });

    if (!firstLoad) {
      hashconnect.foundExtensionEvent.once((appMetadata) => {
        // hashconnect.connectToLocalWallet(pairingString, appMetadata);
      });

      hashconnect.findLocalWallets();
    }

    setLoading(false);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('voting_user') || '{}');

    if (savedUser && savedUser.accountId) {
      setAccountId(savedUser.accountId);
      setConnected(savedUser.connected);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('voting_user', JSON.stringify({ accountId, connected }));
  }, [accountId, connected]);

  useEffect(() => {
    initWalletConnect(true);
  }, []);

  const user = {
    connected,
    accountId,
    hashpackTopicId,
    loading,
    disconnectHashpack,
    setLoading,
    setConnected,
    setAccountId,
    setPairingString: () => {},
    setHashpackTopicId,
    initWalletConnect,
  };

  //@ts-ignore
  return <HashpackContext.Provider value={user}>{children}</HashpackContext.Provider>;
}
