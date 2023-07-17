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
  Grid,
} from '@/components';

import styles from './styles.module.scss';

export default function CurrentVotes() {
  const { id } = useParams();
  const { state } = useRating();
  const allRatings = Object.entries(state[id]?.ratings || {});

  return (
    <Grid item xs={12}>
      <Typography variant="body1">
        Below you can see all of the current votes on this application:
      </Typography>

      <TableContainer component={Paper} className={styles.voteTable}>
        <Table>
          <TableBody>
            {allRatings.map(([accountId, rating]) => (
              <TableRow key={accountId}>
                <TableCell>Account: {accountId}</TableCell>
                <TableCell>Rating: {rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
