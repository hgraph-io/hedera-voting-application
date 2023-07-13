import Image from 'next/image';
import Link from 'next/link';
export default function SubmissionDetailPage() {
  return (
    <Link href="/admin/dashboard">
      <Image
        width={1000}
        height={1000}
        style={{ objectFit: 'contain', width: '100vw', zIndex: -1, position: 'relative' }}
        src="/admin-submission-detail-placeholder.png"
        alt="application placeholder"
        sizes="100vw"
      />
    </Link>
  );
}
