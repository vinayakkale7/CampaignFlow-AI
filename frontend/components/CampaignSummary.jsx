function CampaignSummary({ result, loading, executionTime, briefData }) {
  if (!result && !loading) return null;

  const data = result?.brief || briefData || {};
  
  return (
    <div className="glass-card" style={{ marginBottom: 24 }}>
      <h2 className="display" style={{ fontSize: 16, marginTop: 0, marginBottom: 16 }}>
        Campaign Summary
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Brand</div>
          <div style={{ fontWeight: 500 }}>{data.brand || '---'}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Audience</div>
          <div style={{ fontWeight: 500 }}>{data.audience || '---'}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Platform</div>
          <div style={{ fontWeight: 500 }}>{data.platform || '---'}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Status</div>
          <div style={{ fontWeight: 500, color: result ? 'var(--teal)' : '#f59e0b' }}>
            {result ? 'Completed' : 'Running...'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Execution Time</div>
          <div className="mono" style={{ fontWeight: 500 }}>
            {executionTime ? `${(executionTime / 1000).toFixed(1)}s` : '---'}
          </div>
        </div>
      </div>
    </div>
  );
}
