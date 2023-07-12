import Providers from './providers';

// Layout is always server component
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
