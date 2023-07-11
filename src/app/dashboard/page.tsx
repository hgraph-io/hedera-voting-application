import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Typography, Container, Button } from '@/components';
import Card from '@/components/Card';
import styles from './styles.module.scss';

export default async function SubmitPage() {
  const supabase = createServerComponentClient({ cookies });
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  console.log('aaaaaaaaaaaaaaaa');
  const test = await supabase.auth.getUser();
  console.log(test);
  // const submissions = await supabase.from('submission').select('*').eq('id', user!.id);

  // console.log(submissions);
  return <div></div>;

  return (
    <Container maxWidth="md" className={styles.dashboardContainer}>
      <div className={styles.header}>
        <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
          Dashboard
        </Typography>
        <Typography align="left" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
          vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
          vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
          vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
        </Typography>
        <Button
          component="a"
          href="/speaker/submit"
          className={styles.buttonContainer}
          variant="contained"
        >
          Submit New Application
        </Button>
      </div>
      <div className={styles.cardContainer}>
        {submissions && <Typography variant="h4">Previous Applications</Typography>}
        <div className={styles.cardContainer}>
          {/*// @ts-ignore */}
          {submissions.map((submission, index) => (
            <Card key={index} {...submission} />
          ))}
        </div>
      </div>
    </Container>
  );
}
