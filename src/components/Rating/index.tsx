'use client';

import { useParams } from 'next/navigation';
import { Rating as MuiRating } from '@mui/material';
import { useRating, useHashConnect } from '@/context';
import { Typography, StarBorderRoundedIcon } from '@/components';
import styles from './styles.module.scss';

export default function StarRating(props: {
  className: string;
  readOnly?: boolean;
  average?: number;
  value?: number;
}) {
  const { id } = useParams();
  const { accountId } = useHashConnect();
  const { state, submit } = useRating();

  const { average, ...rest } = props;

  return (
    <div className={styles.root}>
      <MuiRating
        icon={<StarBorderRoundedIcon sx={{ color: '#07E78E', fontSize: 40 }} />}
        emptyIcon={<StarBorderRoundedIcon style={{ color: '#ebebeb', fontSize: 40 }} />}
        value={(accountId && state[id]?.ratings?.[accountId]) || 0}
        onChange={(_: any, newRating: number | null) => submit(id, newRating)}
        {...rest}
      />
      {average && <Typography variant="body2">{average} out of 5</Typography>}
    </div>
  );
}
