function ResultTabs({ result, API_BASE }) {
  const { useState } = React;
  const { motion, AnimatePresence } = window.Motion;
  const [activeTab, setActiveTab] = useState('Marketing');

  const tabs = [
    { id: 'Research', icon: '🔍' },
    { id: 'Marketing', icon: '📈' },
    { id: 'Creative', icon: '✨' },
    { id: 'Landing Page', icon: '💻' },
    { id: 'Exports', icon: '📦' }
  ];

  const tabStyle = (isActive) => ({
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: 8,
    background: isActive ? 'var(--ink)' : 'transparent',
    color: isActive ? '#fff' : 'var(--muted)',
    fontWeight: 500,
    fontSize: 14,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  });

  return (
    <div className="glass-card" style={{ padding: 0, marginTop: 24 }}>
      <div style={{ display: 'flex', gap: 8, padding: 16, borderBottom: '1px solid var(--line)', background: 'rgba(255,255,255,0.4)', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <div key={t.id} className="display" style={tabStyle(activeTab === t.id)} onClick={() => setActiveTab(t.id)}>
            <span>{t.icon}</span> {t.id}
          </div>
        ))}
      </div>
      <div style={{ padding: 32 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Research' && (
              <div>
                <h3 className="display">Industry Research</h3>
                <p>{result.research?.industry_research}</p>
                <h3 className="display">Competitors</h3>
                <ul style={{ paddingLeft: 20 }}>{result.research?.competitor_analysis?.map((c, i) => <li key={i}>{c}</li>)}</ul>
                <h3 className="display">Market Trends</h3>
                <ul style={{ paddingLeft: 20 }}>{result.research?.market_trends?.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
            {activeTab === 'Marketing' && (
              <div style={{ display: 'grid', gap: 24 }}>
                <div>
                  <h3 className="display">Google Ads</h3>
                  {result.marketing?.google_ads?.map((ad, i) => (
                    <div key={i} style={{ padding: 16, background: '#fff', border: '1px solid var(--line)', marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ color: '#1a0dab', fontSize: 18, marginBottom: 4 }}>{ad.headline}</div>
                      <div style={{ color: '#4d5156', fontSize: 14 }}>{ad.description}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="display">Instagram</h3>
                  <div style={{ padding: 16, background: '#fff', borderRadius: 8, border: '1px solid var(--line)' }}>
                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{result.marketing?.instagram_caption}</p>
                  </div>
                </div>
                <div>
                  <h3 className="display">LinkedIn</h3>
                  <div style={{ padding: 16, background: '#fff', borderRadius: 8, border: '1px solid var(--line)' }}>
                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{result.marketing?.linkedin_post}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Creative' && (
              <div>
                <h3 className="display">Concept</h3>
                <p><strong>Headline:</strong> {result.creative?.headline}</p>
                <p><strong>Tagline:</strong> {result.creative?.tagline}</p>
                <p><strong>CTA:</strong> {result.creative?.cta}</p>
                <h3 className="display" style={{ marginTop: 24 }}>Visual Direction</h3>
                <div className="mono" style={{ padding: 16, background: '#f9fafb', border: '1px solid var(--line)', borderRadius: 8 }}>
                  {result.creative?.image_prompt}
                </div>
              </div>
            )}
            {activeTab === 'Landing Page' && (
              <div>
                <h3 className="display">Hero Section</h3>
                <h1 style={{ fontSize: 32, marginBottom: 8, letterSpacing: -0.5 }}>{result.landing_page?.hero?.headline}</h1>
                <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 24 }}>{result.landing_page?.hero?.subheadline}</p>
                <button className="btn-primary" style={{ width: 'auto', display: 'inline-flex', padding: '12px 24px', borderRadius: 8 }}>
                  {result.landing_page?.hero?.cta}
                </button>
                <h3 className="display" style={{ marginTop: 40, borderTop: '1px solid var(--line)', paddingTop: 24 }}>Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {result.landing_page?.features?.map((f, i) => (
                    <div key={i} style={{ padding: 16, background: '#fff', border: '1px solid var(--line)', borderRadius: 8 }}>
                      <strong style={{ display: 'block', marginBottom: 8 }}>{f.title}</strong>
                      <span style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5 }}>{f.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'Exports' && (
              <ExportPanel result={result} API_BASE={API_BASE} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
