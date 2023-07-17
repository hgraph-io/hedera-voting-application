import { Checkbox, Link, FormGroup, FormControlLabel } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

type Submission = Database['public']['Tables']['submission']['Row'];

export default function AdminCard({ id, name, moderator }: Submission) {
  return (
    <Link href={`/submission/${id}`} className={`${styles.cardContainer} {$styles.vote}`}>
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
          <FormGroup>
            <FormControlLabel control={<Checkbox color="default" />} label="Pending review" />
          </FormGroup>
        </div>
      </div>
    </Link>
  );
}
