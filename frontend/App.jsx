const API_BASE = window.location.origin.includes("5500") || window.location.protocol === "file:"
  ? "http://localhost:8000"
  : "http://localhost:8000";

function App() {
  const { useState, useEffect } = React;
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [log, setLog] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionTime, setExecutionTime] = useState(null);
  const [briefData, setBriefData] = useState(null);

  const refreshLog = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/experiments`);
      const data = await res.json();
      setLog(data.log || []);
    } catch (e) { /* backend not running yet */ }
  };

  useEffect(() => { refreshLog(); }, []);

  // Simulate progress animation while backend works
  useEffect(() => {
    let interval;
    if (loading) {
      setCurrentStep(0);
      interval = setInterval(() => {
        setCurrentStep(prev => (prev < 6 ? prev + 1 : prev));
      }, 1500); // Step every 1.5s
    } else if (result) {
      setCurrentStep(7); // All complete
    }
    return () => clearInterval(interval);
  }, [loading, result]);

  const onGenerate = async (brief) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setExecutionTime(null);
    setBriefData(brief);
    
    const startTime = Date.now();
    try {
      const res = await fetch(`${API_BASE}/api/campaign/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setResult(data);
      setExecutionTime(Date.now() - startTime);
      refreshLog();
    } catch (e) {
      setError('Could not reach the backend. Is it running on localhost:8000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Slate />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', width: '100%' }}>
        <div className="dashboard-grid">
          
          {/* Left Column: Campaign Brief */}
          <div className="sticky-panel">
            <BriefForm onGenerate={onGenerate} loading={loading} />
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: '100%' }}>
            
            <CampaignSummary result={result} loading={loading} executionTime={executionTime} briefData={briefData} />
            <AIAgentsStatus currentStep={currentStep} loading={loading} />
            <ExecutionMetrics result={result} loading={loading} executionTime={executionTime} />

            {(loading || result) && (
              <WorkflowCanvas currentStep={currentStep} />
            )}
            
            <CampaignProgress currentStep={currentStep} loading={loading} />
            <AutomationTimeline currentStep={currentStep} loading={loading} result={result} entries={log} />

            {error && <div style={{ color: 'var(--marker)', marginBottom: 16, padding: 16, border: '1px solid var(--marker)', borderRadius: 6 }} className="mono">{error}</div>}
            
            {!result && !error && !loading && (
              <div style={{ color: 'var(--muted)', fontSize: 14, padding: 32, textAlign: 'center', border: '1px dashed var(--line)', borderRadius: 6, marginBottom: 24 }}>
                Fill in the campaign brief and run the automation. The 5 AI agents will orchestrate research, marketing, creative direction, landing page generation, and PDF export sequentially.
              </div>
            )}

            {result && (
              <div style={{ marginBottom: 24 }}>
                {result.demo_mode && (
                  <div className="mono" style={{ fontSize: 12, color: 'var(--marker)', marginBottom: 16, padding: 12, background: '#fff3e0', border: '1px solid #ff9800', borderRadius: 4 }}>
                    ● Running in demo mode — set GEMINI_API_KEY in .env for live generation
                  </div>
                )}
                
                {result.guardrail_flags && result.guardrail_flags.length > 0 && (
                  <div className="mono" style={{ fontSize: 12, color: '#d32f2f', marginBottom: 16, padding: 12, background: '#ffebee', border: '1px solid #d32f2f', borderRadius: 4 }}>
                    ⚠ Guardrail Alerts: {result.guardrail_flags.join(" | ")}
                  </div>
                )}

                <ResultTabs result={result} API_BASE={API_BASE} />
              </div>
            )}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
