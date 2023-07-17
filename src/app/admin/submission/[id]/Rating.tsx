// @ts-nocheck
'use client';

import { useRating, useHashConnect } from '@/context';
import { Rating, Typography } from '@/components';

export default function StarRating(props: {
  className: string;
  icon: React.ReactNode;
  emptyIcon: React.ReactNode;
  submissionId: string;
}) {
  // @ts-ignore
  const { accountId } = useHashConnect();
  const { state, submit } = useRating();
  const { submissionId, ...rest } = props;

  // console.log('xxxxxxxxx');
  // console.log(state);
  // console.log('yyyyyyyyyyyyyyyyyyy');

  // console.log((accountId && state[submissionId]?.ratings?.[accountId]) || 0)

  return (
    <>
      <Rating
        {...rest}
        value={(accountId && state[submissionId]?.ratings?.[accountId]) || 0}
        onChange={(_: any, newRating: number | null) => submit(submissionId, newRating)}
      />
      {/*<Typography variant="body2">{rating} out of 5</Typography>*/}
    </>
  );
}
