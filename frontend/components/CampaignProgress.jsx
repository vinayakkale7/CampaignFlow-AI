function CampaignProgress({ currentStep, loading }) {
  if (currentStep === 0 && !loading) return null;

  const steps = [
    { id: 1, name: 'Research' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Creative' },
    { id: 4, name: 'Landing Page' },
    { id: 5, name: 'Export' },
    { id: 6, name: 'Memory Update' }
  ];

  const percentage = Math.min(100, Math.round((currentStep / steps.length) * 100));

  return (
    <div className="glass-card" style={{ marginBottom: 24 }}>
      <h2 className="display" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginTop: 0, color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Campaign Progress</span>
        <span style={{ color: 'var(--ink)' }}>{percentage}%</span>
      </h2>
      
      <div style={{ width: '100%', height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden', margin: '16px 0 24px 0' }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--ink)', transition: 'width 0.5s ease-out' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {steps.map(step => {
          let statusIcon = '○';
          let color = 'var(--muted)';
          let fontWeight = 400;

          if (currentStep > step.id) {
            statusIcon = '✔';
            color = 'var(--ink)';
            fontWeight = 500;
          } else if (currentStep === step.id) {
            statusIcon = '⏳';
            color = '#3b82f6'; // running blue
            fontWeight = 500;
          }

          return (
            <div key={step.id} style={{ fontSize: 14, color: color, display: 'flex', alignItems: 'center', gap: 10, fontWeight }}>
              <span style={{ fontSize: 14, width: 16, textAlign: 'center' }}>{statusIcon}</span>
              <span>{step.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
