import { createClient } from '@supabase/supabase-js'
import { AdminCard, Typography, Container, BackButton, Grid } from '@/components'
import type { Database } from '@/types'

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY)
  throw new Error('Missing Supabase URL or Service Key')

export default async function AdminResultsPage() {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!)

  const { data: submissions } = await supabase.from('submission').select('*')

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <BackButton href="/admin/dashboard" />
          <Typography variant="h3">Results</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Below are all of the submissions grouped by their status.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" mb={2}>
            Approved panelists &amp; moderators
          </Typography>
          {submissions
            ?.filter((submission) => submission.status === 'Approved')
            .map((submission: any, index: number) => <AdminCard key={index} {...submission} />)}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" mb={2}>
            Pending submissions
          </Typography>
          {submissions
            ?.filter((submission) => submission.status === 'Pending')
            .map((submission: any, index: number) => <AdminCard key={index} {...submission} />)}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" mb={2}>
            Not selected
          </Typography>
          {submissions
            ?.filter((submission) => submission.status === 'Not selected')
            .map((submission: any, index: number) => <AdminCard key={index} {...submission} />)}
        </Grid>
      </Grid>
    </Container>
  )
}
