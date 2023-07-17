import { Rating, Button, Link } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

type Submission = Database['public']['Tables']['submission']['Row'];

export default function AdminCard({ id, name, moderator }: Submission) {
  // const renderButton = () => {
  //   return (
  //     <>
  //       <div className={styles.buttonLabel}>You didn’t vote on this application yet</div>
  //       <Link href={`/application/${id}`}>
  //         <Button className={styles.cardButton} variant="contained">
  //           {type}
  //         </Button>
  //       </Link>
  //     </>
  //   );
  // };

  return (
    <Link href={`/admin/submission/${id}`} className={`${styles.cardContainer} {$styles.vote}`}>
      <div className={`${styles.card} ${styles.vote}`}>
        <div className={styles.left}>
          <div className={styles.bar}></div>
          <div className={styles.speakerLabel}>Name</div>
          <div className={styles.speaker}>{name}</div>
        </div>

        <div className={styles.middle}>
          <div className={styles.titleLabel}>Moderator</div>
          <div className={styles.title}>{moderator ? 'True' : 'False'}</div>
        </div>

        <div className={styles.right}>
          <div>
            <div className={styles.ratingLabel}>Current Rating with X votes</div>
            <Rating className={styles.ratingContainer} name="rating" value={5} readOnly />
          </div>
        </div>
      </div>
    </Link>
  );
}
