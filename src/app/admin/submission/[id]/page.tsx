import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import {
  Typography,
  BackButton,
  Container,
  Grid,
  Chip,
  Link,
  VoteCard,
  SuperAdminCard,
  Divider,
} from '@/components'
import type { Database } from '@/types'
import CurrentVotes from './CurrentVotes'
import TotalVotes from './TotalVotes'

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env

export default async function SubmissionPage({ params: { id } }: { params: { id: string } }) {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!)
  const { data: submission } = await supabase
    .from('submission')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single()

  if (!submission) notFound()
  const { name, organization, profile, links, topics } = submission

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <BackButton href="/admin/dashboard" />
          <Typography variant="h3">Submission review</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body2">Speaker Name</Typography>
              <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Organization</Typography>
              <Typography variant="h6">{organization}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Public Profile</Typography>
              {profile && (
                <Link href={profile} variant="body2" target="_blank" rel="noopener noreferrer">
                  {profile}
                </Link>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Relevant Topics:</Typography>
              {topics!.map((topic, topicIndex) => (
                <Chip
                  key={topicIndex}
                  label={topic}
                  color="primary"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '5px',
                    maxWidth: 'unset',
                  }}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Links:</Typography>
              {links!.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link}
                  variant="body2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link}
                </Link>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Your Vote</Typography>
              <VoteCard />
            </Grid>
            <Grid item xs={12}>
              <TotalVotes />
            </Grid>
            <Grid item xs={12}>
              <CurrentVotes />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <SuperAdminCard {...submission} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
