function AIAgentsStatus({ currentStep, loading }) {
  const agents = [
    { id: 1, name: 'Research Agent', icon: '🔍' },
    { id: 2, name: 'Marketing Agent', icon: '📢' },
    { id: 3, name: 'Creative Agent', icon: '🎨' },
    { id: 4, name: 'Landing Page Agent', icon: '🌐' },
    { id: 5, name: 'Memory Agent', icon: '🧠' }
  ];

  return (
    <div className="glass-card" style={{ marginBottom: 24 }}>
      <h2 className="display" style={{ fontSize: 16, marginTop: 0, marginBottom: 16 }}>
        AI Agents Status
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        {agents.map(agent => {
          let statusText = 'Ready';
          let dotColor = 'var(--line)';

          if (loading && currentStep === agent.id) {
            statusText = 'Running';
            dotColor = '#3b82f6';
          } else if (currentStep > agent.id) {
            statusText = 'Completed';
            dotColor = '#10b981';
          }

          return (
            <div key={agent.id} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 12, background: 'var(--paper)', borderRadius: 8, border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, boxShadow: statusText === 'Running' ? '0 0 0 2px rgba(59,130,246,0.2)' : 'none' }} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{agent.icon} {agent.name}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', paddingLeft: 16 }}>
                Status: {statusText}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
