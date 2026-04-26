import { useState } from 'react';
import { colors } from '../styles/theme';
import { generateOutreach } from '../services/anthropic';

function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '20px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: colors.accent,
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function OutreachGen({ prospect, account }) {
  const [type, setType] = useState('email');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use first stakeholder as the warm connection reference
  const stakeholder = account.stakeholders[0];

  const handleGenerate = async () => {
    setLoading(true);
    setOutput(null);
    setError(null);
    try {
      const text = await generateOutreach({ type, prospect, account, stakeholder });
      setOutput(text);
    } catch (e) {
      setError('Unable to generate outreach. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setOutput(null);
    setError(null);
  };

  // Format email output — bold Subject line
  const renderOutput = (text) => {
    if (type === 'email' && text.startsWith('Subject:')) {
      const lines = text.split('\n');
      const subject = lines[0];
      const body = lines.slice(1).join('\n').trim();
      return (
        <>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '10px',
              paddingBottom: '10px',
              borderBottom: `1px solid ${colors.border}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {subject}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: colors.text,
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}
          >
            {body}
          </div>
        </>
      );
    }
    return (
      <div
        style={{ fontSize: '12px', color: colors.text, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}
      >
        {text}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          fontSize: '10px',
          fontFamily: "'DM Mono', monospace",
          color: colors.textDim,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '12px',
        }}
      >
        Generate Outreach
      </div>

      {/* Type Toggle */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {['email', 'linkedin'].map((t) => (
          <button
            key={t}
            onClick={() => handleTypeChange(t)}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: `1px solid ${type === t ? colors.accent : colors.border}`,
              background: type === t ? `${colors.accent}18` : 'transparent',
              color: type === t ? colors.accent : colors.textMuted,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {t === 'email' ? 'Email' : 'LinkedIn'}
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '11px',
          borderRadius: '8px',
          border: 'none',
          cursor: loading ? 'wait' : 'pointer',
          background: loading ? colors.accentDim : colors.accent,
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '-0.1px',
        }}
      >
        {loading ? 'Generating…' : `Draft ${type === 'email' ? 'Email' : 'LinkedIn Message'}`}
      </button>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: `${colors.red}10`,
            border: `1px solid ${colors.red}30`,
            fontSize: '12px',
            color: colors.red,
            lineHeight: 1.5,
          }}
        >
          {error}
        </div>
      )}

      {/* Output */}
      {output && !loading && (
        <div
          style={{
            marginTop: '12px',
            padding: '14px',
            borderRadius: '8px',
            background: colors.card,
            border: `1px solid ${colors.border}`,
            lineHeight: 1.6,
          }}
        >
          {renderOutput(output)}
        </div>
      )}
    </div>
  );
}
