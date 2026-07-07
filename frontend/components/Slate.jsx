function Slate() {
  return (
    <header style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: '20px 32px', display: 'flex', alignItems: 'flex-start',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%', background: 'var(--marker)',
            boxShadow: '0 0 0 3px rgba(227,61,61,0.25)'
          }} />
          <div>
            <h1 className="display" style={{ fontSize: 20, margin: 0, letterSpacing: 0.5 }}>
              CampaignFlow <span style={{ color: 'var(--marker)' }}>AI</span>
            </h1>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
              AI Marketing Automation Platform
            </div>
          </div>
        </div>
        <div style={{ color: '#a1a1aa', fontSize: 13, marginTop: 4 }}>
          Run complete AI marketing campaigns using multiple specialized AI agents.
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
        <div className="mono" style={{ display: 'flex', gap: 16, fontSize: 12, color: '#a1a1aa', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            🟢 Status: Ready
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            Env: Production
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', background: '#fff', color: 'var(--ink)' }}>
            🚀 Run Campaign
          </button>
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
            + New Campaign
          </button>
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
            ⬇ Export
          </button>
        </div>
      </div>
    </header>
  );
}
