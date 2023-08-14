'use client'

import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ThemeSupa, VIEWS } from '@supabase/auth-ui-shared'
import { Container, Auth } from '@/components'
import styles from './styles.module.scss'

export default function SupabaseAuthUI() {
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()
  const view = VIEWS[searchParams.get('v')?.toUpperCase() || VIEWS.SIGN_IN] || VIEWS.SIGN_IN
  console.log(view)
  console.log(VIEWS)

  return (
    <Container className={styles.loginPageContainer}>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#6541d2', // Button background color
                brandAccent: '#7048e8', // Button hover background color
                brandButtonText: '#ffffff', // Button text color
                defaultButtonBackground: '#6541d2', // Default button background color
                defaultButtonBorder: '#000000', // Default button border color
                defaultButtonText: '#000000', // Default button text color
                inputLabelText: '#000000', // Label text color
              },
              space: {
                buttonPadding: '10px 20px', // Button padding
              },
              fontSizes: {
                baseButtonSize: '16px', // Button font size
                baseLabelSize: '18px', // Label font size
              },
              fonts: {
                buttonFontFamily: '"Styrene A", Arial', // Button font family
                labelFontFamily: '"Styrene A", Arial', // Label font family
              },
              borderWidths: {
                buttonBorderWidth: '1px', // Button border width
              },
              radii: {
                borderRadiusButton: '50px', // Button border radius
              },
            },
          },
        }}
        // theme="dark"
        providers={[]}
        view={view}
      />
    </Container>
  )
}
