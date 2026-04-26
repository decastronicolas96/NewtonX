import { colors } from '../styles/theme';

export default function ScoreBadge({ score }) {
  const bg = score >= 90 ? colors.greenBg : score >= 80 ? colors.yellowBg : colors.grayBg;
  const border = score >= 90 ? colors.green : score >= 80 ? colors.yellow : colors.textDim;
  const color = score >= 90 ? colors.green : score >= 80 ? colors.yellow : colors.textMuted;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '42px',
        height: '26px',
        borderRadius: '6px',
        background: bg,
        border: `1px solid ${border}30`,
        color,
        fontSize: '13px',
        fontFamily: "'DM Mono', monospace",
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {score}
    </span>
  );
}
