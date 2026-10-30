import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import ContactForm from '@/components/ContactForm';
import PostCard from '@/components/PostCard';
import ProjectCard from '@/components/ProjectCard';
import Testimonials from '@/components/Testimonials';
import TestimonialCta from '@/components/TestimonialCta';
import CertCards from '@/components/CertCards';
import {
  profile, socials, hero, stats, sections, about, skills, projects, experience, earlier,
  certs, training, education, mentoring, linkedinBanner, testimonialCta,
} from '@/content/site';
import { listPublishedPosts, listApprovedComments } from '@/lib/store';

export const revalidate = 60;

const isWeb = (href) => /^https?:/i.test(href);

export default async function Home() {
  const [posts, testimonials] = await Promise.all([listPublishedPosts(), listApprovedComments('general')]);
  const latest = posts.slice(0, 3);

  return (
    <main>
      {/* ================= HERO ================= */}
      <header className="hero2" id="home">
        <div className="w">
          <div className="hero2-grid">
            <div>
              <span className="pill"><i className="dot" />{hero.status}</span>
              <p className="greet">{hero.greeting}</p>
              <h1><span className="gt">{hero.firstName}</span> {hero.lastName}</h1>
              <p className="role">{hero.role}</p>
              <p className="lead">{hero.summary}</p>
              <div className="bt2">
                <Link className="btn2 pri" href={hero.primaryButton.href}>{hero.primaryButton.label} <Icon name="arrow" /></Link>
                <a className="btn2 out" href={profile.cvUrl}><i className="dot" />{hero.secondaryButtonLabel} <Icon name="doc" /></a>
              </div>
              <div className="soc">
                {socials.map((s) => (
                  <a key={s.label} className="soc-i" href={s.href} aria-label={s.label} title={s.label}
                     {...(isWeb(s.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <Icon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
            <div className="frame">
              <Image src={profile.photo} alt={profile.name} width={420} height={525} priority />
              <span className="chipi c1"><Icon name="shield" /></span>
              <span className="chipi c2"><Icon name="cloud" /></span>
              <span className="chipi c3"><Icon name="lock" /></span>
            </div>
          </div>
          <div className="stats2">
            {stats.map(([n, label]) => (
              <div key={label}><b>{n}</b><span>{label}</span></div>
            ))}
          </div>
        </div>
      </header>

      {/* ================= ABOUT ================= */}
      <section id="about">
        <div className="w">
          <div className="sh"><span className="lab">{sections.about.label}</span><h2>{sections.about.title}</h2></div>
          <div className="card ab">
            <div className="l"><Rich text={about.lead} /></div>
            <div>
              {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
              <ul>{about.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <div className="loc"><Icon name="pin" />Based in {profile.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills">
        <div className="w">
          <div className="sh">
            <span className="lab">{sections.skills.label}</span>
            <div><h2>{sections.skills.title}</h2><p>{sections.skills.text}</p></div>
          </div>
          <div className="g3">
            {skills.map(([icon, title, tags]) => (
              <div className="card sk" key={title}>
                <div className="ic"><Icon name={icon} /></div>
                <h3>{title}</h3>
                <div className="tg">{tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section id="work">
        <div className="w">
          <div className="center-head">
            <span className="pill"><Icon name="sparkle" />{sections.projects.badge}</span>
            <h2 className="big gt">{sections.projects.title}</h2>
            <p>{sections.projects.text}</p>
          </div>
          <div className="pj-grid">
            {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience">
        <div className="w">
          <div className="sh">
            <span className="lab">{sections.experience.label}</span>
            <div><h2>{sections.experience.title}</h2><p>{sections.experience.text}</p></div>
          </div>
          {experience.map((e) => (
            <div className="tl" key={e.dates}>
              <div className="d">{e.dates}<small>{e.place}</small></div>
              <div>
                <h3>{e.role}</h3>
                <h4>{e.company}</h4>
                <ul className="bl">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
          <details>
            <summary>Show earlier career</summary>
            <div className="er">
              {earlier.map((e) => (
                <div key={e.dates}>
                  <div className="h"><b>{e.role}</b><small>{e.dates}</small></div>
                  <p>{e.company}</p>
                  <ul className="bl">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ================= CERTIFICATIONS + EDUCATION ================= */}
      <section id="certifications">
        <div className="w">
          <div className="sh">
            <span className="lab">{sections.credentials.label}</span>
            <div><h2>{sections.credentials.title}</h2><p>{sections.credentials.text}</p></div>
          </div>
          <CertCards certs={certs} />
          <div className="card tr">
            <span className="lab">Technical Training</span>
            <div className="pills">{training.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
          <div className="ed" style={{ marginTop: 80 }}>
            <div><span className="lab">Education</span><h2 style={{ marginTop: 20 }}>Technical foundations.</h2></div>
            {education.map((e) => (
              <div className="it" key={e.title}>
                <small>{e.year}</small>
                <h3>{e.title}</h3>
                <p>{e.place}{e.place2 && <><br />{e.place2}</>}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MENTORING ================= */}
      <section id="mentoring" className="mentor">
        <div className="w">
          <div className="mentor-grid">
            <div>
              <span className="pill"><i className="dot" />{mentoring.pill}</span>
              <h2 className="big"><span className="gt">{mentoring.headline}</span></h2>
              <p className="lead">{mentoring.text}</p>
              <div className="bt2">
                <a className="btn2 pri" href={profile.topmate} target="_blank" rel="noopener noreferrer"><Icon name="calendar" />{mentoring.bookLabel} <Icon name="arrow" /></a>
                <a className="btn2 out" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" />{mentoring.linkedinLabel}</a>
              </div>
              <p className="eyebrow">{mentoring.workedAtLabel}</p>
              <div className="chips">{mentoring.workedAt.map((c) => <span key={c}>{c}</span>)}</div>
            </div>
            <div className="mstats">
              {mentoring.stats.map(([n, label]) => (
                <div key={label}><b className="gt">{n}</b><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= LINKEDIN BANNER ================= */}
      <div className="w">
        <div className="li">
          <div className="li-ic"><Icon name="linkedin" /></div>
          <div className="li-tx">
            <span className="eyebrow pink">{linkedinBanner.eyebrow}</span>
            <h3>{linkedinBanner.titleA} <span className="gt gold">{linkedinBanner.titleB}</span></h3>
            <p>{linkedinBanner.text}</p>
          </div>
          <a className="btn2 lin" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" />{linkedinBanner.button} <Icon name="arrow" />
          </a>
        </div>
      </div>

      {/* ================= BLOG ================= */}
      <section id="blog">
        <div className="w">
          <div className="sh">
            <span className="lab">{sections.blog.label}</span>
            <div><h2>{sections.blog.title}</h2><p>{sections.blog.text}</p></div>
          </div>
          {latest.length === 0 ? (
            <p className="empty">The first posts are on the way.</p>
          ) : (
            <>
              <div className="g3">{latest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
              <div style={{ marginTop: 28 }}><Link className="btn" href="/blog">View all posts →</Link></div>
            </>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="tsec">
        <div className="w">
          <TestimonialCta cfg={testimonialCta} />
          <h2 className="big gt center" style={{ margin: '70px 0 40px' }}>{sections.testimonials.title}</h2>
        </div>
        <Testimonials items={testimonials} />
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact">
        <div className="w">
          <div className="center-head">
            <span className="pill"><Icon name="sparkle" />{sections.contact.badge}</span>
            <h2 className="big gt">{sections.contact.title}</h2>
            <p>{sections.contact.text}</p>
          </div>
          <div className="contact-grid">
            <aside className="cinfo">
              <h3>Contact info</h3>
              <div className="crow"><span className="ico"><Icon name="mail" /></span><div><small>Email</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div></div>
              <div className="crow"><span className="ico"><Icon name="phone" /></span><div><small>Phone</small>{profile.phone}</div></div>
              <div className="crow"><span className="ico"><Icon name="pin" /></span><div><small>Location</small>{profile.location}</div></div>
              <div className="follow">
                <small>Follow</small>
                <div className="soc">
                  {socials.map((s) => (
                    <a key={s.label} className="soc-i" href={s.href} aria-label={s.label} title={s.label}
                       {...(isWeb(s.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      <Icon name={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
