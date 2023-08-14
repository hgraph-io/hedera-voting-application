import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  Grid,
} from '@/components'
import type { Database } from '@/types'

import topics from './topics.json'
import submit from './submit'
import styles from './styles.module.scss'

type Submission = Database['public']['Tables']['submission']['Row']

export default function SubmissionForm({ submission }: { submission?: Submission }) {
  const {
    id,
    name,
    organization,
    profile,
    links,
    topics: selectedTopics,
    moderator,
    panelist,
  } = submission || {}

  return (
    <div className={styles.submitApplication}>
      <div className={styles.buttonContainer}>
        <Button
          component="a"
          href="/dashboard"
          variant="outlined"
          style={{ margin: '20px 0px 30px' }}
        >
          Go Back
        </Button>
      </div>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Submission' : 'Submit a new application'}
      </Typography>
      <form action={submit}>
        {id && <input type="hidden" name="id" value={id} />}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField name="name" label="Name" defaultValue={name} fullWidth required />
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
              name="profile"
              defaultValue={profile}
              label="Public Profile (Linkedin, etc)"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel component="legend">
              Topic(s) you are interested in speaking about:
            </FormLabel>
            <FormGroup>
              {topics?.map((topic) => (
                <FormControlLabel
                  key={topic}
                  label={topic}
                  control={
                    <Checkbox
                      name="topics"
                      value={topic}
                      defaultChecked={selectedTopics?.includes(topic)}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Participation</FormLabel>
            <FormControlLabel
              control={<Checkbox name="moderator" defaultChecked={moderator} />}
              label="Moderator"
            />
            <FormControlLabel
              control={<Checkbox name="panelist" defaultChecked={panelist} />}
              label="Panelist"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">
              Please list links to previous presentations or articles you’ve done on these
              topic(s)
            </FormLabel>
            <TextField
              name="links"
              label="Links"
              fullWidth
              required
              // helperText="Please list links to previous presentations or articles you’ve done on these topic(s)"
              defaultValue={links}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
