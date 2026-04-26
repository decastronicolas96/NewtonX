import { colors } from '../styles/theme';

function DeptBlock({ dept, status, stakeholder, prospect, priority, notes, onClick }) {
  const styles = {
    active: {
      bg: colors.greenBg,
      border: `${colors.green}40`,
      dot: colors.green,
      label: 'Engaged',
    },
    cooling: {
      bg: `${colors.yellow}18`,
      border: `${colors.yellow}30`,
      dot: colors.yellow,
      label: 'Cooling',
    },
    targeted: {
      bg: `${colors.accent}10`,
      border: `${colors.accent}30`,
      dot: colors.accent,
      label: 'Target',
    },
    unmapped: {
      bg: colors.grayBg,
      border: `${colors.textDim}20`,
      dot: colors.textDim,
      label: 'Unmapped',
    },
  };

  const s = styles[status] || styles.unmapped;
  const isClickable = status === 'targeted';

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      style={{
        padding: '12px',
        borderRadius: '8px',
        background: s.bg,
        border: `1px solid ${s.border}`,
        cursor: isClickable ? 'pointer' : 'default',
        transition: isClickable ? 'all 0.15s ease' : 'none',
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.background = `${colors.accent}18`;
          e.currentTarget.style.borderColor = `${colors.accent}50`;
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.background = s.bg;
          e.currentTarget.style.borderColor = s.border;
        }
      }}
    >
      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: colors.text,
          marginBottom: '6px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {dept}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: s.dot,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '10px',
            fontFamily: "'DM Mono', monospace",
            color: colors.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
          }}
        >
          {s.label}
        </span>
      </div>
      {(stakeholder || prospect) && (
        <div style={{ fontSize: '11px', color: colors.textDim, marginTop: '2px' }}>
          {stakeholder || prospect}
        </div>
      )}
      {priority && status === 'targeted' && (
        <div
          style={{
            fontSize: '10px',
            fontFamily: "'DM Mono', monospace",
            color:
              priority === 'Very High'
                ? colors.green
                : priority === 'High'
                ? colors.accent
                : colors.yellow,
            marginTop: '3px',
          }}
        >
          {priority} priority
        </div>
      )}
      {notes && status === 'unmapped' && (
        <div
          style={{
            fontSize: '10px',
            color: colors.textDim,
            marginTop: '3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {notes}
        </div>
      )}
    </div>
  );
}

export default function WhiteSpaceMap({ account, onSelectProspect }) {
  const { whiteSpace, prospects } = account;

  const handleTargetedClick = (dept) => {
    const prospectName = whiteSpace.targeted.find((t) => t.dept === dept)?.prospect;
    const prospect = prospects.find((p) => p.name === prospectName);
    if (prospect) onSelectProspect(prospect);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '19px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '6px',
            letterSpacing: '-0.3px',
          }}
        >
          White Space — {account.company}
        </div>
        <div style={{ fontSize: '13px', color: colors.textMuted }}>
          {account.engaged} engaged · {whiteSpace.targeted.length} targeted ·{' '}
          {whiteSpace.unmapped.length} unmapped
        </div>
      </div>

      {/* Penetration Bar */}
      <div
        style={{
          marginBottom: '24px',
          padding: '16px',
          background: colors.card,
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: colors.text }}>
            Account Penetration
          </span>
          <span
            style={{
              fontSize: '14px',
              fontFamily: "'DM Mono', monospace",
              color: colors.accent,
              fontWeight: 600,
            }}
          >
            {account.penetration}%
          </span>
        </div>
        <div
          style={{
            height: '8px',
            borderRadius: '4px',
            background: colors.gray,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${account.penetration}%`,
              background: `linear-gradient(90deg, ${colors.green}, ${colors.accent})`,
              borderRadius: '4px',
              transition: 'width 0.6s ease',
            }}
          />
        </div>
        <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '8px' }}>
          {account.relevant - account.engaged} department{account.relevant - account.engaged !== 1 ? 's' : ''}{' '}
          with potential NewtonX buyers not yet engaged
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Engaged', color: colors.green },
          { label: 'Cooling', color: colors.yellow },
          { label: 'Target Identified', color: colors.accent },
          { label: 'Unmapped', color: colors.textDim },
        ].map((l) => (
          <div
            key={l.label}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '3px',
                background: l.color,
              }}
            />
            <span
              style={{
                fontSize: '11px',
                color: colors.textMuted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>

      {/* Department Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: '8px',
        }}
      >
        {whiteSpace.engaged.map((e) => (
          <DeptBlock
            key={e.dept}
            dept={e.dept}
            status={e.status}
            stakeholder={e.stakeholder}
          />
        ))}
        {whiteSpace.targeted.map((t) => (
          <DeptBlock
            key={t.dept}
            dept={t.dept}
            status="targeted"
            prospect={t.prospect}
            priority={t.priority}
            onClick={() => handleTargetedClick(t.dept)}
          />
        ))}
        {whiteSpace.unmapped.map((u) => (
          <DeptBlock
            key={u.dept}
            dept={u.dept}
            status="unmapped"
            notes={u.notes}
          />
        ))}
      </div>
    </div>
  );
}
