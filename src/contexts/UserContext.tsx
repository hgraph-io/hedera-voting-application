import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { supabase } from '../supabaseClient'

type User = {
  connected: boolean;
  type: string;
  token: string;
  accountId: string;
  loading: boolean;
  hashpackTopicId: string;
  disconnectHashpack: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountId: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPairingString: React.Dispatch<React.SetStateAction<string>>;
  setHashpackTopicId: React.Dispatch<React.SetStateAction<string>>;
  initWalletConnect: (firstLoad: boolean) => Promise<boolean>;
} | null | undefined;

const UserContext = createContext<User>(undefined);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
  const [accountId, setAccountId] = useState<string>('');
  const [type, setType] = useState<string>('user');
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hashpackTopicId, setHashpackTopicId] = useState<string | undefined>(undefined);
  const hashconnect = new HashConnect();

  const disconnectHashpack = () => {
    if (hashpackTopicId) {
      hashconnect.disconnect(hashpackTopicId);
      setAccountId('');
      setConnected(false);
    }
  };

  const initWalletConnect = async (firstLoad: boolean) => {
    setLoading(true);
    
    let appMetadata: HashConnectTypes.AppMetadata = {
      name: "Hedera Voting Application",
      description: "Voting Application Created By Hedera",
      icon: "https://launch.turtlemoon.io/_next/static/media/default-profile-picture.75ccdb8e.png"
    };

    let initData = await hashconnect.init(appMetadata, "testnet", false);
    let topic = initData.savedPairings[0] ? initData.savedPairings[0].topic : initData.topic;
    let pairingString = initData.pairingString;

    setHashpackTopicId(topic);

    hashconnect.pairingEvent.on(async (pairingData) => {
      if (pairingData.accountIds) {
        setAccountId(pairingData.accountIds[0]);
        setConnected(true);
        const userType = await checkAdminStatus(pairingData.accountIds[0]);
        setType(userType);
      }
    });

    if (!firstLoad) {
      hashconnect.foundExtensionEvent.once((appMetadata) => {
        hashconnect.connectToLocalWallet(pairingString, appMetadata);
      });

      hashconnect.findLocalWallets();
    }
    
    setLoading(false);
  };

  const checkAdminStatus = async (accountId: string): Promise<string> => {
    const { data: adminAccounts, error } = await supabase
      .from('admin_accounts')
      .select('accountId')
      .eq('accountId', accountId);
  
    if (error) {
      console.error('Error: ', error);
      return 'user';
    } else if (adminAccounts && adminAccounts.length > 0) {
      return 'admin';
    } else {
      return 'user';
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("voting_user") || "{}");

    if (savedUser && savedUser.accountId) {
      setAccountId(savedUser.accountId);
      setConnected(savedUser.connected);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "voting_user",
      JSON.stringify({ accountId, connected })
    );
  }, [accountId, connected]);

  useEffect(() => {
    initWalletConnect(true);
  }, []);

  const user = {
    connected,
    type,
    accountId,
    hashpackTopicId,
    loading,
    disconnectHashpack,
    setLoading,
    setConnected,
    setAccountId,
    setType,
    setPairingString: () => {},
    setHashpackTopicId,
    initWalletConnect,
  };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
