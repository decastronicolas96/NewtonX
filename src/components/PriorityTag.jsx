import { colors } from '../styles/theme';

const priorityColors = {
  'Very High': colors.green,
  'High': colors.accent,
  'Medium-High': colors.yellow,
  'Medium': colors.textMuted,
};

export default function PriorityTag({ priority }) {
  const color = priorityColors[priority] || colors.textMuted;
  return (
    <span
      style={{
        fontSize: '10px',
        fontFamily: "'DM Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color,
        fontWeight: 500,
      }}
    >
      {priority}
    </span>
  );
}
