import { useState } from 'react';
import { colors } from '../styles/theme';
import ScoreBadge from './ScoreBadge';
import PriorityTag from './PriorityTag';
import IntroTag from './IntroTag';

const signalColors = [
  { test: /mckinsey|bcg|bain|consulting|ex-/i, color: colors.purple, bg: `${colors.purple}12` },
  { test: /grew|growth|expand|growing|raised|revenue/i, color: colors.green, bg: `${colors.green}12` },
  { test: /compet|snowflake|databricks|google|stripe|adyen|aws|gcp/i, color: colors.coral, bg: `${colors.coral}12` },
];

function getSignalStyle(signal) {
  for (const { test, color, bg } of signalColors) {
    if (test.test(signal)) return { color, bg };
  }
  return { color: colors.accent, bg: `${colors.accent}10` };
}

export default function ProspectList({ account, onSelectProspect, selectedProspectId }) {
  const sorted = [...account.prospects].sort((a, b) => b.score - a.score);
  const divisionCount = new Set(account.prospects.map((p) => p.division)).size;

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
          Expansion Targets — {account.company}
        </div>
        <div style={{ fontSize: '13px', color: colors.textMuted }}>
          {account.prospects.length} prospects identified across {divisionCount}{' '}
          division{divisionCount !== 1 ? 's' : ''}. Ranked by expansion fit score.
        </div>
      </div>

      {/* Prospect Cards */}
      {sorted.map((p) => {
        const isSelected = p.id === selectedProspectId;
        return (
          <div
            key={p.id}
            onClick={() => onSelectProspect(p)}
            style={{
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '8px',
              cursor: 'pointer',
              background: isSelected ? `${colors.accent}12` : colors.card,
              border: `1px solid ${isSelected ? colors.accent + '40' : colors.border}`,
              transition: 'all 0.15s ease',
              borderLeft: isSelected ? `3px solid ${colors.accent}` : `1px solid ${colors.border}`,
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = colors.cardHover;
                e.currentTarget.style.borderColor = colors.borderLight;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = colors.card;
                e.currentTarget.style.borderColor = colors.border;
              }
            }}
          >
            {/* Row 1: name + tags */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px',
              }}
            >
              <div style={{ minWidth: 0, flex: 1, marginRight: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: colors.text }}>
                    {p.name}
                  </span>
                  <PriorityTag priority={p.priority} />
                  <IntroTag type={p.intro} />
                </div>
                {/* Row 2: title + dept */}
                <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '2px' }}>
                  {p.title} · {p.dept}
                </div>
                {/* Row 3: prev role */}
                <div style={{ fontSize: '11px', color: colors.textDim }}>
                  Previously: {p.prevRole}
                </div>
              </div>
              <ScoreBadge score={p.score} />
            </div>

            {/* Row 4: signal tags (top 2) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {p.signals.slice(0, 2).map((s, i) => {
                const { color, bg } = getSignalStyle(s);
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: bg,
                      color,
                      border: `1px solid ${color}20`,
                      maxWidth: '280px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.length > 65 ? s.substring(0, 62) + '…' : s}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
