function WorkflowNode({ title, status, index, isLast }) {
  const { motion } = window.Motion;
  
  let bgColor = 'rgba(255,255,255,0.8)';
  let borderColor = 'var(--line)';
  let textColor = 'var(--muted)';
  let icon = '○';

  if (status === 'running') {
    bgColor = 'rgba(235,248,255,0.9)'; // Blue tint
    borderColor = '#3b82f6';
    textColor = '#2563eb';
    icon = '●';
  } else if (status === 'completed') {
    bgColor = 'rgba(240,253,244,0.9)'; // Green tint
    borderColor = '#22c55e';
    textColor = '#16a34a';
    icon = '✓';
  } else if (status === 'failed') {
    bgColor = 'rgba(254,242,242,0.9)'; // Red tint
    borderColor = '#ef4444';
    textColor = '#dc2626';
    icon = '✕';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ display: 'flex', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}
    >
      <div style={{
        padding: '8px 16px', borderRadius: 8, border: `1px solid ${borderColor}`,
        background: bgColor, color: textColor, fontSize: 13, display: 'flex', gap: 8,
        alignItems: 'center', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
        boxShadow: status === 'running' ? '0 0 0 2px rgba(59,130,246,0.2)' : 'none'
      }}>
        <span className="mono" style={{ fontSize: 14 }}>{icon}</span>
        <span className="display" style={{ letterSpacing: 0.3, fontWeight: status === 'completed' ? 500 : 400 }}>{title}</span>
      </div>
      {!isLast && (
        <div style={{ padding: '0 12px', color: 'var(--muted)', fontSize: 14 }}>
          ↓
        </div>
      )}
    </motion.div>
  );
}

function WorkflowCanvas({ currentStep }) {
  const steps = [
    'Campaign Brief', 'Research', 'Marketing', 'Creative', 'Landing Page', 'Export', 'Brand Memory'
  ];

  const getStatus = (index) => {
    // Current step logic assumes Brief is index 0 (completed immediately)
    if (index === 0) return 'completed';
    if (index < currentStep + 1) return 'completed';
    if (index === currentStep + 1) return 'running';
    return 'pending';
  };

  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h2 className="display" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginTop: 0, color: 'var(--muted)' }}>
        Workflow Pipeline
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', paddingTop: 8 }}>
        {steps.map((s, i) => (
          <WorkflowNode key={s} title={s} status={getStatus(i)} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </div>
  );
}
