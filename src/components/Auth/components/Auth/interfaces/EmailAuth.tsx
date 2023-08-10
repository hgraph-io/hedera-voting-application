import { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { ViewSignUp, ViewSignIn, VIEWS } from '@supabase/auth-ui-shared';
import { Appearance } from './../../../types';
import { Anchor, Button, Container, Input, Label } from './../../UI';

import { useSnackbar } from '@/context';
import { SnackbarMessageSeverity } from '@/types';

export interface EmailAuthProps {
  authView?: ViewSignIn | ViewSignUp;
  setAuthView?: any;
  supabaseClient: SupabaseClient;
  appearance?: Appearance;
  children?: React.ReactNode;
}

export function EmailAuth({
  authView = 'sign_in',
  setAuthView = () => {},
  supabaseClient,
  appearance,
  children,
}: EmailAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    switch (authView) {
      case 'sign_in':
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) openSnackbar(signInError.message, SnackbarMessageSeverity.Error);
        else openSnackbar('You are now signed in!', SnackbarMessageSeverity.Success);
        break;
      case 'sign_up':
        const {
          data: { user, session },
          error,
        } = await supabaseClient.auth.signUp({ email, password });
        if (error) openSnackbar(error.message, SnackbarMessageSeverity.Error);
        // Check if session is null -> email confirmation setting is turned on
        else if (user && !session)
          openSnackbar(
            'Please check your email for a confirmation link.',
            SnackbarMessageSeverity.Info
          );
        break;
    }
    setLoading(false);
  };

  const inOrUp = authView === 'sign_in' ? 'in' : 'up';

  return (
    <form
      id={authView === 'sign_in' ? `auth-sign-in` : `auth-sign-up`}
      onSubmit={handleSubmit}
      autoComplete={'on'}
      style={{ width: '100%' }}
    >
      <Container direction="vertical" gap="large" appearance={appearance}>
        <Container direction="vertical" gap="large" appearance={appearance}>
          <div>
            <Label htmlFor="email" appearance={appearance}>
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Your email address"
              defaultValue={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              autoComplete="email"
              appearance={appearance}
            />
          </div>
          <div>
            <Label htmlFor="password" appearance={appearance}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              defaultValue={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              autoComplete={authView === 'sign_in' ? 'current-password' : 'new-password'}
              appearance={appearance}
            />
          </div>
          {children}
        </Container>

        <Button type="submit" color="primary" loading={loading} appearance={appearance}>
          {loading ? `Signing ${inOrUp}...` : `Sign ${inOrUp}`}
        </Button>

        <Container direction="vertical" gap="small" appearance={appearance}>
          {authView === VIEWS.SIGN_IN && (
            <Anchor
              href="#auth-forgot-password"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView(VIEWS.FORGOTTEN_PASSWORD);
              }}
              appearance={appearance}
            >
              Forgot your password?
            </Anchor>
          )}
          {authView === VIEWS.SIGN_IN ? (
            <Anchor
              href="#auth-sign-up"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView(VIEWS.SIGN_UP);
              }}
              appearance={appearance}
            >
              Don’t have an account? Sign up
            </Anchor>
          ) : (
            <Anchor
              href="#auth-sign-in"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView(VIEWS.SIGN_IN);
              }}
              appearance={appearance}
            >
              Already have an account? Sign in
            </Anchor>
          )}
        </Container>
      </Container>
    </form>
  );
}
