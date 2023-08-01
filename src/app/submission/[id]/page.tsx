import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  Grid,
} from '@/components';
import type { Database } from '@/types';

import submit from '../submit';
import styles from './styles.module.scss';

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: submission } = await supabase
    .from('submission')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (!submission) notFound();
  const { name, organization, links, topics, moderator } = submission;

  return (
    <div className={styles.submitApplication}>
      <Button
        component="a"
        href="/dashboard"
        variant="outlined"
        style={{ margin: '20px 0px 30px' }}
      >
        Go Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Edit Submission
      </Typography>
      <form action={submit}>
        <input type="hidden" name="id" value={id} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              defaultValue={name}
              label="Speaker Name"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="organization"
              defaultValue={organization}
              label="Organization"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="links"
              defaultValue={links}
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
                control={
                  <Checkbox
                    name="topics"
                    defaultChecked={topics?.includes('Hedera Consensus Service')}
                    defaultValue="Hedera Consensus Service"
                  />
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="topics"
                    defaultChecked={topics?.includes('Smart Contracts')}
                    value="Smart Contracts"
                  />
                }
                label="Smart Contracts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="topics"
                    defaultChecked={topics?.includes('dApps')}
                    value="dApps"
                  />
                }
                label="dApps"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="topics"
                    defaultChecked={topics?.includes('Consensus')}
                    value="Consensus"
                  />
                }
                label="Consensus"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Participation</FormLabel>
            <FormControlLabel
              control={<Checkbox name="moderator" defaultChecked={!!moderator} />}
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
    </div>
  );
}
