// Renders text where **double asterisks** mean bold. Used for editable content.
export default function Rich({ text }) {
  return String(text || '').split('**').map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));
}
