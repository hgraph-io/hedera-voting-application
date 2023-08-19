import { Checkbox, Link, FormGroup, FormControlLabel } from '@/components'
import type { Database } from '@/types'
import styles from './styles.module.scss'

type Submission = Database['public']['Tables']['submission']['Row']

export default function Card({ id, name, moderator, status }: Submission) {
  // Define a mapping for checkbox properties based on status
  const checkboxPropsMapping = {
    'Approved': { color: "success", checked: true, readOnly: false },
    'Pending': { color: "success", readOnly: true },
    'Not Selected': { color: "warning", readOnly: true }
  };

  // Fetch the appropriate checkbox properties using the status
  const checkboxProps = checkboxPropsMapping[status] || {};

  return (
    <Link href={`/submission/${id}`} className={`${styles.cardContainer} ${styles.vote}`}>
      <div className={`${styles.card} ${styles[status.toLowerCase()]}`}>
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
            <FormControlLabel
              control={<Checkbox className={styles.checkBox} {...checkboxProps} />}
              label={status}
              disabled
            />
          </FormGroup>
        </div>
      </div>
    </Link>
  )
}
