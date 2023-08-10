import { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Appearance } from '../../../types';
import { Button, Container, Input, Label } from './../../UI';

import { useSnackbar } from '@/context';
import { SnackbarMessageSeverity } from '@/types';

function UpdatePassword({
  supabaseClient,
  appearance,
}: {
  supabaseClient: SupabaseClient;
  appearance?: Appearance;
}) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (error) openSnackbar(error.message, SnackbarMessageSeverity.Error);
    else openSnackbar('Password updated successfully', SnackbarMessageSeverity.Success);
    setLoading(false);
  };

  return (
    <form id="auth-update-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction={'vertical'} appearance={appearance}>
        <div>
          <Label htmlFor="password" appearance={appearance}>
            New password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="New password"
            type="password"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            appearance={appearance}
          />
        </div>
        <Button type="submit" color="primary" loading={loading} appearance={appearance}>
          {loading ? 'Updating password' : 'Update password'}
        </Button>
      </Container>
    </form>
  );
}

export { UpdatePassword };
