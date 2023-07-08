import { cookies } from 'next/headers';
import { Database } from '@/types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import {
  Button,
  TextField,
  Container,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  Grid,
} from '@/components';

import styles from './styles.module.scss';

export default async function SpeakerSubmissionPage() {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function submit(data: FormData) {
    'use server';
    console.log(user!.id);
    console.log(data);
  }

  return (
    <Container className={styles.submitApplication}>
      <Button
        component="a"
        href="/speaker"
        variant="outlined"
        style={{ margin: '20px 0px 30px' }}
      >
        Go Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Submit Application
      </Typography>
      <form action={submit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="name" label="Speaker Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField name="organization" label="Organization" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="links"
              label="Links"
              fullWidth
              required
              helperText="Enter comma-separated links."
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Relevant Topics</FormLabel>
            <FormGroup>
              <FormControlLabel
                label="Hedera Consensus Service"
                control={<Checkbox name="topics" value="Hedera Consensus Service" />}
              />
              <FormControlLabel
                control={<Checkbox name="topics" value="Smart Contracts" />}
                label="Smart Contracts"
              />
              <FormControlLabel
                control={<Checkbox name="topics" value="dApps" />}
                label="dApps"
              />
              <FormControlLabel
                control={<Checkbox name="topics" value="Consensus" />}
                label="Consensus"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Participation</FormLabel>
            <FormControlLabel
              control={<Checkbox name="moderator" />}
              label="I’m interested in being a moderator"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
