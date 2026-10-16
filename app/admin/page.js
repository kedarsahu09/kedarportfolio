import AdminApp from '@/components/AdminApp';
import { isAdmin } from '@/lib/auth';
import { usingMemory } from '@/lib/store';
import { emailConfigured } from '@/lib/notify';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminApp authed={isAdmin()} usingMemory={usingMemory} emailConfigured={emailConfigured()} />;
}
