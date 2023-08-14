'use client';

import { useParams } from 'next/navigation';
import { useRating } from '@/context';

import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@/components';

import styles from './styles.module.scss';

export default function CurrentVotes() {
  const { id } = useParams();
  const { ratingState } = useRating();
  const allRatings =
    ratingState[id as string]?.ratings && Object.entries(ratingState[id as string].ratings);

  return (
    <>
      <Typography variant="body1">
        Below you can see all of the current votes on this application:
      </Typography>

      <TableContainer component={Paper} className={styles.voteTable}>
        <Table>
          <TableBody>
            {allRatings?.map(([accountId, rating]: [string, number]) => (
              <TableRow key={accountId}>
                <TableCell>Account: {accountId}</TableCell>
                <TableCell>Rating: {rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
