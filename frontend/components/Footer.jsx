function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--line)', 
      marginTop: 48, 
      padding: '32px 24px', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16,
      maxWidth: 1200,
      margin: '48px auto 0 auto',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--marker)' }} />
        <span className="display" style={{ fontWeight: 600, fontSize: 14 }}>CampaignFlow AI <span style={{ color: 'var(--muted)', fontWeight: 400 }}>v1.0</span></span>
      </div>
      <div className="mono" style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
        <span>Powered by FastAPI, Gemini, ChromaDB, React</span>
        <span>|</span>
        <span>Built by Vinayak Kale</span>
      </div>
    </footer>
  );
}
