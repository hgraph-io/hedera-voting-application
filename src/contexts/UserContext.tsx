import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashConnect, HashConnectTypes } from 'hashconnect';

type User = {
    loggedIn: boolean;
    type: string;
    token: string;
    disconnectHashpack: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
    setAccountId: React.Dispatch<React.SetStateAction<string>>;
    setPairingString: React.Dispatch<React.SetStateAction<string>>;
    setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initWalletConnect:(firstLoad: boolean) => Promise<void>;
} | null | undefined;

const UserContext = createContext<User>(undefined);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const hashconnect = new HashConnect();
  const [hashpackTopicId, setHashpackTopicId] = useState<string | undefined>(undefined);
  
  const disconnectHashpack = () => {
    if (hashpackTopicId) {
      hashconnect.disconnect(hashpackTopicId);
      setUser(prevState => ({...prevState, accountId: '', connected: false}));
    }
  };

  const initWalletConnect = async (firstLoad: boolean) => {
      const initData = await hashconnect.init({
          name: "Voting Application",
          description: "Open sourced voting application from Hedera",
          icon: ""
      }, "testnet", false);
      
      setHashpackTopicId(initData.savedPairings[0]?.topic ?? initData.topic);

      hashconnect.pairingEvent.on(async (pairingData) => {
          setUser(prevState => ({...prevState, accountId: pairingData.accountIds[0], connected: true}));
      });

      if (!firstLoad) {
          hashconnect.findLocalWallets();
      }

      const savedPairingsId = initData.savedPairings[0]?.accountIds[0];
      const hashconnectDataId = JSON.parse(localStorage.getItem('hashconnectData') ?? '{}')?.pairingData?.[0]?.accountIds[0];

      setUser(prevState => ({
          ...prevState,
          accountId: savedPairingsId ?? hashconnectDataId,
          connected: true,
          pairingString: initData.pairingString
      }));
  };


  useEffect(() => {
    setUser({
      loggedIn: false,
      type: 'user',
      token: '',
      disconnectHashpack,
      setLoading: () => {},
      setAccountId: () => {},
      setConnected: () => {},
      setPairingString: () => {},
      setWalletModalOpen: () => {},
      initWalletConnect
    });

    initWalletConnect(true);
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
