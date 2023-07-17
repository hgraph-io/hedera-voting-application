'use client';

import { RatingProvider } from '@/context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RatingProvider>{children}</RatingProvider>;
}
