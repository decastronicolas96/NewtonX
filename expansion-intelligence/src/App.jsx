import { useState, useEffect } from 'react';
import { colors } from './styles/theme';
import { accountsData } from './data/accounts';
import Sidebar from './components/Sidebar';
import ProspectList from './components/ProspectList';
import WhiteSpaceMap from './components/WhiteSpaceMap';
import ProspectDetail from './components/ProspectDetail';

const { accounts } = accountsData;

export default function App() {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [activeTab, setActiveTab] = useState('prospects');

  const account = accounts.find((a) => a.id === selectedAccountId);

  // Reset state when switching accounts
  const handleSelectAccount = (id) => {
    setSelectedAccountId(id);
    setSelectedProspect(null);
    setActiveTab('prospects');
  };

  // When selecting from white space map, also switch to prospects tab
  const handleSelectProspect = (prospect) => {
    setSelectedProspect(prospect);
    setActiveTab('prospects');
  };

  const handleCloseDetail = () => {
    setSelectedProspect(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: colors.bg,
        overflow: 'hidden',
      }}
    >
      {/* LEFT: Sidebar */}
      <Sidebar
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        onSelectAccount={handleSelectAccount}
      />

      {/* CENTER: Main content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${colors.border}`,
            background: colors.sidebar,
            flexShrink: 0,
          }}
        >
          {[
            { key: 'prospects', label: 'Prospect List' },
            { key: 'whitespace', label: 'White Space Map' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '14px 24px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                background: 'transparent',
                color: activeTab === tab.key ? colors.accent : colors.textMuted,
                borderBottom:
                  activeTab === tab.key
                    ? `2px solid ${colors.accent}`
                    : '2px solid transparent',
                transition: 'all 0.15s ease',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
          {/* CPM label on the right */}
          <div style={{ flex: 1 }} />
          <div
            style={{
              padding: '14px 20px',
              fontSize: '12px',
              color: colors.textDim,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            CPM: {account.cpm}
          </div>
        </div>

        {/* Center + Right panel wrapper */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Scrollable center content */}
          <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
            {activeTab === 'prospects' ? (
              <ProspectList
                account={account}
                onSelectProspect={handleSelectProspect}
                selectedProspectId={selectedProspect?.id || null}
              />
            ) : (
              <WhiteSpaceMap account={account} onSelectProspect={handleSelectProspect} />
            )}
          </div>

          {/* RIGHT: Detail panel (slides in when prospect selected) */}
          {selectedProspect && (
            <ProspectDetail
              prospect={selectedProspect}
              account={account}
              onClose={handleCloseDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}
