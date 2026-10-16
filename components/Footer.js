import Link from 'next/link';
import Icon from './Icon';
import { profile } from '@/content/site';

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <b><Icon name="shield" />{profile.name}</b>
        <span>{profile.footerLine}</span>
        <Link href="/#home">Back to top ↑</Link>
      </div>
    </footer>
  );
}
