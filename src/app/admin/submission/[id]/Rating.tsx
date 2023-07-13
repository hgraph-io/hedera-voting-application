'use client';
import { Rating } from '@/components';

export default function StarRating(props: any) {
  console.log(props);
  return <Rating {...props} onChange={(event) => console.log(event.target.value)} />;
}
