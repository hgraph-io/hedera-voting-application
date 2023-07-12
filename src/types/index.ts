export * from './supabase';

export enum SnackbarMessageSeverity {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export type SnackbarContextProps = {
  openSnackbar: (message: string, severity: SnackbarMessageSeverity) => void;
};

// export type HashpackAccount = {
//   connected: boolean;
//   token?: string;
//   accountId: string;
//   loading: boolean;
//   hashpackTopicId?: string;
//   disconnectHashpack: () => void;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setConnected: React.Dispatch<React.SetStateAction<boolean>>;
//   setAccountId: React.Dispatch<React.SetStateAction<string>>;
//   setPairingString: React.Dispatch<React.SetStateAction<string>>;
//   setHashpackTopicId: React.Dispatch<React.SetStateAction<string | undefined>>;
//   initWalletConnect: (firstLoad: boolean) => Promise<boolean>;
// };

export type Vote = {
  type: 'vote';
  choice: string;
  rating: number;
  ballotId: string;
  accountId: string;
};

// call for paper application
export type CFPSubmission = {
  id: number;
  name: string;
  organization: string;
  topics: string[];
  links: string[];
  moderator: boolean;
};
