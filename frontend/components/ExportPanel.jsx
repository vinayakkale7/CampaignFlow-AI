function ExportPanel({ result, API_BASE }) {
  if (!result) return null;

  const exports = [
    { title: 'Campaign PDF', desc: 'Full presentation deck', filename: result.pdf_filename, color: 'var(--teal)', icon: '📄' },
    { title: 'Campaign JSON', desc: 'Raw structured payload', filename: result.json_filename, color: 'var(--marker)', icon: '{ }' },
    { title: 'Markdown Report', desc: 'Formatted text document', filename: result.md_filename, color: 'var(--ink)', icon: 'M↓' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      {exports.map(e => (
        <div key={e.title} style={{ padding: 16, background: '#fff', border: '1px solid var(--line)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `${e.color}15`, color: e.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600 }}>
              {e.icon}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{e.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{e.desc}</div>
            </div>
          </div>
          <a href={`${API_BASE}/api/download/${e.filename}`} target="_blank" className="btn-primary" style={{ background: e.color, padding: '10px 0' }}>
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
