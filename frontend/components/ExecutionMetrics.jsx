function ExecutionMetrics({ result, loading, executionTime }) {
  if (!result && !loading) return null;

  const metrics = [
    { label: 'Execution Time', value: executionTime ? `${(executionTime / 1000).toFixed(1)}s` : '---', desc: 'Total end-to-end duration', color: '#3b82f6', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> },
    { label: 'Agents Executed', value: result ? '5' : '---', desc: 'Autonomous AI processes', color: '#8b5cf6', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
    { label: 'Campaign Variants', value: result ? '1' : '---', desc: 'Unique directions generated', color: '#f59e0b', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> },
    { label: 'Memory Used', value: result ? 'Yes' : '---', desc: 'Brand context retrieved', color: '#10b981', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
    { label: 'Guardrails', value: result ? (result.guardrail_flags?.length || 0) : '---', desc: 'Policy violations flagged', color: '#ef4444', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> },
    { label: 'LLM Tokens', value: result ? (result.total_tokens_used ? result.total_tokens_used.toLocaleString() : '0') : 'Backend Not Reporting', desc: 'API usage per run', color: '#64748b', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
      {metrics.map((m, i) => (
        <div key={i} className="glass-card metric-card" style={{ padding: 16, borderTop: `3px solid ${m.color}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: m.color }}>
            {m.icon}
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--muted)' }}>
              {m.label}
            </div>
          </div>
          <div className={m.label === 'LLM Tokens' ? '' : 'mono'} style={{ fontSize: m.label === 'LLM Tokens' ? 14 : 24, fontWeight: 600, color: m.label === 'LLM Tokens' ? 'var(--muted)' : 'var(--ink)', marginBottom: 4 }}>
            {m.value}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>
            {m.desc}
          </div>
        </div>
      ))}
    </div>
  );
}
