import { useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { VIEWS } from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Anchor, Button, Container, Input, Label } from './../../UI'

import { useSnackbar } from '@/context'
import { SnackbarMessageSeverity } from '@/types'

export function ForgottenPassword({
  setAuthView = () => {},
  supabaseClient,
  appearance,
}: {
  setAuthView?: any
  supabaseClient: SupabaseClient
  appearance?: Appearance
}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { openSnackbar } = useSnackbar()

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login?v=${VIEWS.ForgottenPassword}`,
    })
    if (error) openSnackbar(error.message, SnackbarMessageSeverity.Error)
    else
      openSnackbar(
        'Please check your email for password reset instructions.',
        SnackbarMessageSeverity.Warning
      )
    setLoading(false)
  }

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction="vertical" appearance={appearance}>
        <div>
          <Label htmlFor="email" appearance={appearance}>
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoFocus
            placeholder="Your email address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            appearance={appearance}
          />
        </div>
        <Button type="submit" color="primary" loading={loading} appearance={appearance}>
          {loading ? 'Sending reset instructions' : 'Send reset password instructions'}
        </Button>
        <Anchor
          href="#auth-sign-in"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            setAuthView(VIEWS.SIGN_IN)
          }}
          appearance={appearance}
        >
          Sign in to your account
        </Anchor>
      </Container>
    </form>
  )
}
