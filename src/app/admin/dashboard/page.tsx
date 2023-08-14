import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types'
import { Typography, Container, Button, AdminCard } from '@/components'
import styles from './styles.module.scss'

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY)
  throw new Error('Missing Supabase URL or Service Key')

export default async function AdminDashboardPage() {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!)

  const { data: submissions } = await supabase
    .from('submission')
    .select('*')
    .order('created_at')

  return (
    <Container maxWidth="md" className={styles.adminDashboardContainer}>
      <div className={styles.header}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography component="p" gutterBottom>
          Welcome to the Hedera COP 28{' '}
          <b>
            <em>Call for Speakers</em>
          </b>{' '}
          admin dashboard!
        </Typography>
        <Typography component="p" gutterBottom>
          Here you can view all submissions and rate them on a scale of 1-5 stars based on how
          well they fit the theme of the conference. All ratings will be stored on the Hedera
          Consensus Service to be tallied and displayed on the website. A selection committee
          will consider all ratings and information to select the final panelists and
          moderators.
        </Typography>
        <Button component="a" variant="contained" href="/admin/results">
          View submission results
        </Button>
      </div>

      <Typography variant="h4" component="h2" gutterBottom>
        Submissions
      </Typography>
      <Typography component="p" gutterBottom>
        Below you can review, manage and select applications from individuals eager to share
        their insights at our upcoming conference. Results are ordered by submission date.
      </Typography>

      <div>
        {submissions?.map(
          (
            submission: any // TODO:
          ) => (
            <AdminCard key={submission.id} {...submission} />
          )
        )}
      </div>
    </Container>
  )
}
