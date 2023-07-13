'use client';
import { Rating } from '@/components';

export default function StarRating(props: any) {
  return <Rating {...props} onChange={(_, value) => console.log(value)} />;
}
