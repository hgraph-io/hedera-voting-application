'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createStitches, createTheme } from '@stitches/core'
import { merge, VIEWS } from '@supabase/auth-ui-shared'
import { Auth as AuthProps } from '../../types'
import { EmailAuth, EmailAuthProps, ForgottenPassword, UpdatePassword } from './interfaces'

function Auth({
  supabaseClient,
  view = 'sign_in',
  appearance,
  theme = 'default',
}: AuthProps): JSX.Element | null {
  const [authView, setAuthView] = useState(view)
  const router = useRouter()

  useEffect(() => {
    createStitches({
      theme: merge(appearance?.theme?.default ?? {}, appearance?.variables?.default ?? {}),
    })
  }, [appearance])

  /**
   * Wraps around all auth components
   * renders the social auth providers if SignView is true
   *
   * also handles the theme override
   *
   * @param children
   * @returns React.ReactNode
   */
  const Container = ({ children }: { children: React.ReactNode }) => (
    // @ts-ignore
    <div
      className={
        theme !== 'default'
          ? createTheme(
              merge(
                // @ts-ignore
                appearance?.theme[theme],
                appearance?.variables?.[theme] ?? {},
              ),
            )
          : ''
      }
    >
      {children}
    </div>
  )

  useEffect(() => {
    /**
     * Overrides the authview if it is changed externally
     */
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
      else if (event === 'USER_UPDATED') setAuthView('sign_in')
      else if (event === 'SIGNED_IN') router.refresh()
    })
    setAuthView(view)

    return () => authListener.subscription.unsubscribe()
  }, [view])

  const emailProp: Omit<EmailAuthProps, 'authView' | 'id'> = {
    supabaseClient,
    setAuthView,
    appearance,
  }

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  switch (authView) {
    case VIEWS.SIGN_UP:
    case VIEWS.SIGN_IN:
      return (
        <Container>
          <EmailAuth
            {...emailProp}
            authView={(authView as 'sign_in' | 'sign_up') || VIEWS.SIGN_UP}
          />
        </Container>
      )

    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <ForgottenPassword
          appearance={appearance}
          supabaseClient={supabaseClient}
          setAuthView={setAuthView}
        />
      )

    case VIEWS.UPDATE_PASSWORD:
      return <UpdatePassword appearance={appearance} supabaseClient={supabaseClient} />
    default:
      return null
  }
}

export default Auth
