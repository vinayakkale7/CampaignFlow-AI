function AutomationTimeline({ currentStep, loading, result, entries }) {
  const { useEffect, useState, useRef } = React;
  const [uiLogs, setUiLogs] = useState([]);
  const bottomRef = useRef(null);
  
  const stepNames = [
    'Campaign Started',
    'Research Completed',
    'Marketing Completed',
    'Creative Completed',
    'Landing Page Generated',
    'Export & Memory Updated'
  ];

  useEffect(() => {
    if (loading && currentStep === 0) {
      setUiLogs([{ time: new Date().toLocaleTimeString(), msg: stepNames[0] }]);
    } else if (loading && currentStep > 0 && currentStep <= 5) {
      setUiLogs(prev => {
        const lastMsg = prev[prev.length - 1]?.msg;
        if (lastMsg !== stepNames[currentStep]) {
          return [...prev, { time: new Date().toLocaleTimeString(), msg: stepNames[currentStep] }];
        }
        return prev;
      });
    }
  }, [currentStep, loading]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [uiLogs, entries, result]);

  if (!loading && !result) return null;

  return (
    <div className="glass-card" style={{ marginBottom: 24, background: '#1e1e1e', color: '#d4d4d4', border: '1px solid #333' }}>
      <h2 className="mono" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginTop: 0, color: '#888', borderBottom: '1px solid #333', paddingBottom: 12, marginBottom: 12 }}>
        > {result ? 'Automation Log (Backend Report)' : 'Automation Timeline (UI Events)'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 180, overflowY: 'auto', paddingRight: 8 }}>
        
        {/* Loading State - Simulated Timeline */}
        {loading && uiLogs.map((log, i) => (
          <div key={i} className="mono" style={{ fontSize: 12 }}>
            <span style={{ color: '#4caf50', marginRight: 12 }}>[{log.time}]</span>
            {log.msg}
          </div>
        ))}
        {loading && (
          <div className="mono" style={{ fontSize: 12, color: '#888', animation: 'pulse 1.5s infinite' }}>
            <span style={{ color: '#ff9800', marginRight: 12 }}>[{new Date().toLocaleTimeString()}]</span>
            Running agent logic...
          </div>
        )}

        {/* Completed State - Real Backend Log */}
        {result && entries && entries.map((entry, idx) => (
          <div key={idx} className="mono" style={{ fontSize: 12, padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, wordBreak: 'break-word' }}>
            <div style={{ color: '#888', marginBottom: 4 }}>{entry.timestamp}</div>
            <div>Generated campaign for <strong>{entry.brand}</strong></div>
            <div style={{ color: entry.status === 'completed' ? '#4caf50' : '#ff9800', marginTop: 4 }}>
              Status: {entry.status} {entry.variants_generated ? `| Variants: ${entry.variants_generated}` : ''}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
