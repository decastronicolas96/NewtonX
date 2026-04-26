import { colors } from '../styles/theme';

export default function IntroTag({ type }) {
  const isWarm = type === 'warm';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        fontFamily: "'DM Mono', monospace",
        color: isWarm ? colors.warm : colors.cold,
        padding: '2px 8px',
        borderRadius: '4px',
        background: isWarm ? `${colors.warm}15` : `${colors.cold}15`,
        border: `1px solid ${isWarm ? colors.warm : colors.cold}25`,
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        fontWeight: 500,
      }}
    >
      <span style={{ fontSize: '8px' }}>{isWarm ? '◉' : '○'}</span>
      {type}
    </span>
  );
}
