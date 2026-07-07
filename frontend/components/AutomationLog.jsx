function AutomationLog({ entries }) {
  if (!entries || entries.length === 0) return null;

  return (
    <div className="glass-card" style={{ marginTop: 24 }}>
      <h2 className="display" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginTop: 0, color: 'var(--muted)' }}>
        Automation Log
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        {entries.slice().reverse().map((entry, idx) => (
          <div key={idx} className="mono" style={{ fontSize: 12, padding: 12, background: 'rgba(255,255,255,0.6)', border: '1px solid var(--line)', borderRadius: 6, wordBreak: 'break-word' }}>
            <div style={{ color: 'var(--muted)', marginBottom: 4 }}>{entry.timestamp}</div>
            <div>Generated campaign for <strong>{entry.brand}</strong></div>
            <div style={{ color: entry.status === 'completed' ? 'var(--teal)' : '#f59e0b', marginTop: 4 }}>
              Status: {entry.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
