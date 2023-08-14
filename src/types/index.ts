export * from './supabase'

export enum SnackbarMessageSeverity {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export type SnackbarContextProps = {
  openSnackbar: (message: string, severity: SnackbarMessageSeverity) => void
}

export type Vote = {
  id: string // submission id
  rating: number
}

// call for paper application
export type CFPSubmission = {
  id: number
  name: string
  organization: string
  topics: string[]
  links: string[]
  moderator: boolean
}
