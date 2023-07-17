'use client';

import { useParams } from 'next/navigation';
import { useRating } from '@/context';

export default function TotalVotes() {
  const { id } = useParams();
  const { state } = useRating();
  return <span>({state?.[id]?.total || 0} votes)</span>;
}
