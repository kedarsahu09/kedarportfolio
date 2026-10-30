'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';

const LINKS = [
  ['Home', '/#home'],
  ['About', '/#about'],
  ['Skills', '/#skills'],
  ['Experience', '/#experience'],
  ['Certifications', '/#certifications'],
  ['Mentoring', '/#mentoring'],
  ['Blog', '/blog'],
  ['Contact', '/#contact'],
];

export default function Nav({ name = 'Kedar' }) {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="w">
        <Link className="logo" href="/#home">
          <Icon name="shield" />
          {name}<b>.</b>
        </Link>
        <ul id="m" className={open ? 'o' : ''}>
          {LINKS.map(([label, href]) => (
            <li key={label}>
              <Link href={href} onClick={() => setOpen(false)}>{label}</Link>
            </li>
          ))}
        </ul>
        <Link className="btn p" href="/#contact">Contact Me</Link>
        <button id="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>☰</button>
      </div>
    </nav>
  );
}
