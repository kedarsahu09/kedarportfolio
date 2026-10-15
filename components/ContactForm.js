'use client';
// Private enquiries open the visitor's email app addressed to you.
export default function ContactForm({ email }) {
  function onSubmit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = d.get('name');
    const subject = encodeURIComponent('Portfolio enquiry from ' + name);
    const body = encodeURIComponent(`${d.get('message')}\n\n${name} (${d.get('email')})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="n">Name</label>
      <input id="n" name="name" placeholder="Your name" required />
      <label htmlFor="e">Email</label>
      <input id="e" name="email" type="email" placeholder="you@company.com" required />
      <label htmlFor="g">Message</label>
      <textarea id="g" name="message" placeholder="How can I help?" required />
      <button className="btn p" type="submit">Send Message →</button>
    </form>
  );
}
