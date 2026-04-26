import { colors } from '../styles/theme';

function StatBox({ label, value, sub }) {
  return (
    <div
      style={{
        padding: '12px 0',
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          fontSize: '10px',
          fontFamily: "'DM Mono', monospace",
          color: colors.textDim,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '4px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '3px' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function StakeholderCard({ s }) {
  return (
    <div
      style={{
        padding: '12px',
        borderRadius: '8px',
        background: colors.card,
        border: `1px solid ${colors.border}`,
        marginBottom: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '6px',
        }}
      >
        <div style={{ minWidth: 0, marginRight: '8px' }}>
          <div
            style={{ fontSize: '13px', fontWeight: 600, color: colors.text, marginBottom: '2px' }}
          >
            {s.name}
          </div>
          <div style={{ fontSize: '11px', color: colors.textMuted, lineHeight: 1.3 }}>
            {s.title}
          </div>
          <div style={{ fontSize: '11px', color: colors.textDim }}>
            {s.dept}
          </div>
        </div>
        {/* Strength bars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
          <span
            style={{
              fontSize: '9px',
              fontFamily: "'DM Mono', monospace",
              color: colors.textDim,
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
              marginRight: '3px',
            }}
          >
            STR
          </span>
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '2px',
                background: i <= s.strength ? colors.green : colors.gray,
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ fontSize: '11px', color: colors.textDim, lineHeight: 1.4 }}>
        Last contact: {s.lastContact}
      </div>
      <div style={{ fontSize: '11px', color: colors.textDim }}>
        {s.projects} project{s.projects !== 1 ? 's' : ''} · {s.channel}
      </div>
    </div>
  );
}

export default function Sidebar({ accounts, selectedAccountId, onSelectAccount }) {
  const account = accounts.find((a) => a.id === selectedAccountId);
  const veryHighCount = account
    ? account.prospects.filter((p) => p.score >= 90).length
    : 0;

  return (
    <div
      style={{
        width: '260px',
        minWidth: '260px',
        background: colors.sidebar,
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '20px 16px',
      }}
    >
      {/* Logo / Branding */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: colors.accent,
            letterSpacing: '-0.2px',
            marginBottom: '2px',
          }}
        >
          Expansion Intelligence
        </div>
        <div
          style={{
            fontSize: '10px',
            fontFamily: "'DM Mono', monospace",
            color: colors.textDim,
          }}
        >
          NewtonX · CPM Dashboard
        </div>
      </div>

      {/* Account Selector */}
      <div style={{ marginBottom: '20px' }}>
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
          Account
        </div>
        {accounts.map((a) => {
          const isSelected = a.id === selectedAccountId;
          return (
            <button
              key={a.id}
              onClick={() => onSelectAccount(a.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                marginBottom: '4px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: isSelected ? `${colors.accent}18` : 'transparent',
                outline: isSelected ? `1px solid ${colors.accent}40` : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isSelected ? colors.accent : colors.text,
                  marginBottom: '2px',
                }}
              >
                {a.company}
              </div>
              <div style={{ fontSize: '11px', color: colors.textMuted }}>
                {a.industry} · {a.tier}
              </div>
            </button>
          );
        })}
      </div>

      {/* Account Stats */}
      {account && (
        <>
          <StatBox
            label="Penetration"
            value={`${account.penetration}%`}
            sub={`${account.engaged} of ${account.relevant} depts engaged`}
          />
          <StatBox
            label="Lifetime Value"
            value={`$${(account.ltv / 1000).toFixed(0)}K`}
            sub={`${account.projects} projects completed`}
          />
          <StatBox
            label="Annual Revenue"
            value={`$${(account.revenue / 1000).toFixed(0)}K`}
            sub={`Since ${account.since}`}
          />
          <StatBox
            label="Expansion Targets"
            value={account.prospects.length}
            sub={`${veryHighCount} very high priority`}
          />

          {/* Stakeholders */}
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                fontSize: '10px',
                fontFamily: "'DM Mono', monospace",
                color: colors.textDim,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '10px',
              }}
            >
              Current Stakeholders
            </div>
            {account.stakeholders.map((s) => (
              <StakeholderCard key={s.id} s={s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
