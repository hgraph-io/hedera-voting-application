import React, {useState, createContext, useEffect, useContext} from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import '../styles/globals.scss';

type User = {
    loggedIn: boolean
    type: string
    token: string
    disconnectHashpack: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setConnected: React.Dispatch<React.SetStateAction<boolean>>
    setAccountId: React.Dispatch<React.SetStateAction<string>>
    setPairingString: React.Dispatch<React.SetStateAction<string>>
    setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null | undefined;

const UserContext = createContext<User>(undefined);
export const useUser = () => useContext(UserContext);

const theme = createTheme({
  palette: {
    primary: {
      main: '#7048E8',
      contrastText: '#ffcc00',
    },
    secondary: {
      light: '#51CF66',
      main: '#7048E8',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#212429',
      secondary: '#495057',
    },
  },
  typography: {
    fontFamily: 'Styrene A Web, Arial',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          height: '32px',
          minWidth: '200px',
          borderRadius: '50px',
          border:'none',
          color: '#212429',
          background: '#F9F9F9',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #21A056, #3EC878)',
          },
        },
        contained: {
          height: '32px',
          minWidth: '200px',
          borderRadius: '50px',
          border:'none',
          color: '#F9F9F9',
          background: '#8259EF',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #21A056, #3EC878)',
          },
        },
        outlined: {
          height: '32px',
          minWidth: '200px',
          color: '#212429',
          border: '1px solid #212429',
          borderRadius: '50px',
          textTransform: 'capitalize',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#7048E8',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '20px 0px 0px',
        },
      },
    },
  },
});


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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
      setWalletModalOpen: () => {}
    });

    initWalletConnect(true);
  }, []);

  return (
    <UserContext.Provider value={user}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Header />
        <main style={{flex: '1 0 auto'}}>
          <Component {...pageProps} />
        </main>
        <footer style={{flexShrink: 0}}>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  </UserContext.Provider>
  );
}

export default MyApp;
