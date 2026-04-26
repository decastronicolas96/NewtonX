import { colors } from '../styles/theme';
import ScoreBadge from './ScoreBadge';
import PriorityTag from './PriorityTag';
import IntroTag from './IntroTag';
import OutreachGen from './OutreachGen';

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div
        style={{
          fontSize: '10px',
          fontFamily: "'DM Mono', monospace",
          color: colors.textDim,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '8px',
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export default function ProspectDetail({ prospect, account, onClose }) {
  return (
    <div
      style={{
        width: '380px',
        minWidth: '380px',
        borderLeft: `1px solid ${colors.border}`,
        background: colors.sidebar,
        overflowY: 'auto',
        padding: '20px',
        animation: 'slideIn 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '14px',
        }}
      >
        <div style={{ minWidth: 0, marginRight: '8px' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '3px',
            }}
          >
            {prospect.name}
          </div>
          <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '2px' }}>
            {prospect.title}
          </div>
          <div style={{ fontSize: '12px', color: colors.textDim }}>
            {prospect.dept} · {prospect.division}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: colors.textDim,
            cursor: 'pointer',
            fontSize: '20px',
            padding: '2px 6px',
            borderRadius: '4px',
            lineHeight: 1,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; e.currentTarget.style.background = colors.card; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textDim; e.currentTarget.style.background = 'none'; }}
        >
          ×
        </button>
      </div>

      {/* Score Row */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}
      >
        <ScoreBadge score={prospect.score} />
        <PriorityTag priority={prospect.priority} />
        <IntroTag type={prospect.intro} />
      </div>

      {/* Signals */}
      <Section label="Signals">
        {prospect.signals.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '7px',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                color: colors.accent,
                fontSize: '10px',
                marginTop: '3px',
                flexShrink: 0,
              }}
            >
              ▸
            </span>
            <span style={{ fontSize: '12px', color: colors.text, lineHeight: 1.5 }}>
              {s}
            </span>
          </div>
        ))}
      </Section>

      {/* Intro Path */}
      <Section label="Intro Path">
        <div
          style={{
            fontSize: '12px',
            color: colors.textMuted,
            lineHeight: 1.6,
            padding: '12px',
            background: colors.card,
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
          }}
        >
          {prospect.proximity}
        </div>
      </Section>

      {/* Fit Rationale */}
      <Section label="Fit Rationale">
        <div style={{ fontSize: '12px', color: colors.textMuted, lineHeight: 1.6 }}>
          {prospect.fit}
        </div>
      </Section>

      {/* Suggested Angle */}
      <Section label="Suggested Angle">
        <div
          style={{
            fontSize: '12px',
            color: colors.accent,
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          {prospect.angle}
        </div>
      </Section>

      {/* Divider */}
      <div style={{ height: '1px', background: colors.border, margin: '4px 0 20px' }} />

      {/* Outreach Generation */}
      <OutreachGen prospect={prospect} account={account} />

      {/* Background */}
      <div
        style={{
          marginTop: '20px',
          padding: '12px',
          borderRadius: '8px',
          background: `${colors.purple}08`,
          border: `1px solid ${colors.purple}15`,
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontFamily: "'DM Mono', monospace",
            color: colors.purple,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '8px',
          }}
        >
          Background
        </div>
        <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>
          <span style={{ fontWeight: 600, color: colors.text }}>Previous: </span>
          {prospect.prevRole}
        </div>
        <div style={{ fontSize: '12px', color: colors.textMuted }}>
          <span style={{ fontWeight: 600, color: colors.text }}>Tenure: </span>
          {prospect.tenure} in current role
        </div>
      </div>
    </div>
  );
}
