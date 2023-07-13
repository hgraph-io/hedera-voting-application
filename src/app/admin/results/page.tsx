import { Typography, Container, Button } from '@/components';
import AdminCard from '@/components/AdminCard';
import styles from './styles.module.scss';

export default async function AdminResultsPage() {
  /*
   * we can create another vote table and join on submissions to calculate the average rating as well as if it's selected or not
   */
  const submissions = await (
    await fetch('http://localhost:54321/rest/v1/submission?select=*')
  ).json();

  return (
    <Container maxWidth="md" className={styles.resultsContainer}>
      <Button
        component="a"
        href="/admin/dashboard"
        variant="outlined"
        className={styles.backButton}
      >
        Back
      </Button>
      <Typography variant="h3">Voting Results</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
        vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
      </Typography>

      <div className={styles.approvedAppContainer}>
        {submissions.length > 0 && (
          <Typography variant="h4" gutterBottom>
            Approved Applications
          </Typography>
        )}
        {submissions.map((submission: any, index: number) => (
          <AdminCard key={index} {...submission} />
        ))}
      </div>

      <div className={styles.openAppContainer}>
        {submissions.length > 0 && <Typography variant="h6">Open Applications</Typography>}
        {submissions.map((submission: any, index: number) => (
          <AdminCard key={index} {...submission} />
        ))}
      </div>
    </Container>
  );
}
