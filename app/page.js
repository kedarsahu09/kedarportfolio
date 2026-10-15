import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import ContactForm from '@/components/ContactForm';
import CommentSection from '@/components/CommentSection';
import PostCard from '@/components/PostCard';
import { profile, heroTags, stats, skills, featured, experience, earlier, certs, training, education } from '@/lib/data';
import { listPublishedPosts, listApprovedComments } from '@/lib/store';

export const revalidate = 60;

export default async function Home() {
  const [posts, comments] = await Promise.all([listPublishedPosts(), listApprovedComments('general')]);
  const latest = posts.slice(0, 3);

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <header className="hero" id="home">
        <div className="w">
          <div className="hg">
            <div>
              <span className="lab">{profile.title}</span>
              <h1>Kedar Nath <span>Sahu</span></h1>
              <div className="tags">
                {heroTags.map((t, i) => (
                  <span key={t}>{i > 0 && <i />}{t}</span>
                ))}
              </div>
              <p className="one">{profile.oneLiner}</p>
              <div className="bt">
                <Link className="btn p" href="#contact">Get in Touch →</Link>
                <a className="btn" href={profile.cvUrl}>Download CV ⤓</a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              </div>
            </div>
            <div className="ph">
              <Image src="/profile.jpg" alt={profile.name} width={340} height={340} priority />
              <div className="badge"><Icon name="check" />ENTERPRISE<br />SECURITY</div>
            </div>
          </div>
          <div className="stats">
            {stats.map(([n, label]) => (
              <div key={label}><b>{n}</b><span>{label}</span></div>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- About ---------- */}
      <section id="about">
        <div className="w">
          <div className="sh"><span className="lab">About</span><h2>Security expertise grounded in real infrastructure.</h2></div>
          <div className="card ab">
            <div className="l">
              I help enterprises find and close security gaps. As a Cybersecurity Consultant at Wipro, I work across cloud security,
              endpoint security, identity and Microsoft 365, with a focus on <b>Microsoft Security and Wiz Cloud/Wiz Code.</b>
            </div>
            <div>
              <p>I started in 2008 as a Windows and infrastructure administrator, then moved through Citrix, VMware and Active Directory into Azure security and identity, and now cloud security with Microsoft 365 Defender and Wiz Cloud/Wiz Code.</p>
              <p>That background means I understand how infrastructure really runs, so the security I design works in production, not just on paper.</p>
              <ul>
                <li>Cloud posture with Wiz Cloud/Wiz Code and Microsoft Defender for Cloud</li>
                <li>Endpoint migrations from CrowdStrike and Trellix to Microsoft Defender</li>
                <li>Identity with Entra ID, Conditional Access, PIM, MFA and RBAC</li>
                <li>Client engagements in Germany and the Netherlands</li>
              </ul>
              <div className="loc"><Icon name="pin" />Based in {profile.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Skills ---------- */}
      <section id="skills">
        <div className="w">
          <div className="sh">
            <span className="lab">Core Skills</span>
            <div>
              <h2>End-to-end security capabilities.</h2>
              <p>A broad technical foundation spanning modern cloud controls, endpoint defense, identity and enterprise infrastructure.</p>
            </div>
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

      {/* ---------- Featured work ---------- */}
      <section id="work" style={{ paddingTop: 20 }}>
        <div className="w">
          <div className="sh" style={{ gridTemplateColumns: '1fr' }}>
            <span className="lab">Featured Work</span>
            <h2>Security transformation in practice.</h2>
          </div>
          <div className="fw">
            {featured.map(([title, text], i) => (
              <div className="card" key={title}>
                <span className="n">0{i + 1}</span>
                <Icon name="arrow" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experience">
        <div className="w">
          <div className="sh">
            <span className="lab">Experience</span>
            <div>
              <h2>A career built from the infrastructure up.</h2>
              <p>Enterprise consulting experience across security, cloud, virtualization and core infrastructure since 2008.</p>
            </div>
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

      {/* ---------- Certifications + Education ---------- */}
      <section id="certifications">
        <div className="w">
          <div className="sh">
            <span className="lab">Credentials</span>
            <div>
              <h2>Certified across the security ecosystem.</h2>
              <p>Current certifications and continued technical training across Microsoft, Citrix and enterprise security.</p>
            </div>
          </div>
          <div className="cg">
            {certs.map(([issuer, name]) => (
              <div className="card cb" key={issuer}>
                <div className="bd"><Icon name="shield" /></div>
                <div><small>{issuer}</small><b>{name}</b></div>
              </div>
            ))}
          </div>
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

      {/* ---------- Blog ---------- */}
      <section id="blog">
        <div className="w">
          <div className="sh">
            <span className="lab">Blog</span>
            <div>
              <h2>Notes on cloud and endpoint security.</h2>
              <p>Practical write-ups from real projects: what worked, what did not, and what I would do differently.</p>
            </div>
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

      {/* ---------- Comments ---------- */}
      <section id="comments" style={{ paddingTop: 20 }}>
        <div className="w">
          <div className="sh" style={{ gridTemplateColumns: '1fr' }}>
            <span className="lab">Comments</span>
            <h2>Leave a comment.</h2>
          </div>
          <CommentSection slug="general" comments={comments} heading="What visitors say" />
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact">
        <div className="w">
          <div className="sh" style={{ gridTemplateColumns: '1fr' }}>
            <span className="lab">Contact</span>
            <h2 style={{ textAlign: 'center', margin: '0 auto' }}>Let’s secure what matters.</h2>
          </div>
          <div className="ct">
            <div>
              <h3>Planning an endpoint migration, improving cloud visibility, or sorting out identity and access?</h3>
              <p className="sb">Let’s talk about how your organization can build a clearer, stronger security posture.</p>
              <div className="ci"><Icon name="mail" /><div><small>Email</small>{profile.email}</div></div>
              <div className="ci"><Icon name="phone" /><div><small>Phone</small>{profile.phone}</div></div>
              <div className="ci"><Icon name="linkedin" /><div><small>LinkedIn</small><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedinLabel}</a></div></div>
              <div className="ci"><Icon name="pin" /><div><small>Location</small>{profile.location}</div></div>
            </div>
            <ContactForm email={profile.email} />
          </div>
        </div>
      </section>
    </main>
  );
}
