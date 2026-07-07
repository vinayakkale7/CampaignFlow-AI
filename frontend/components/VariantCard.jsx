function VariantCard({ v, index }) {
  const flagged = v.guardrail_flags && v.guardrail_flags.length > 0;
  return (
    <div style={{
      minWidth: 280, maxWidth: 280, background: '#fff', border: '1px solid var(--line)',
      borderRadius: 6, padding: 18, marginRight: 16, flexShrink: 0
    }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--marker)', marginBottom: 8 }}>
        TAKE {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="display" style={{ fontSize: 16, margin: '0 0 8px' }}>{v.headline}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.5, color: '#333', margin: '0 0 12px' }}>{v.body}</p>
      <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 10 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>IMAGE DIRECTION</div>
        <p style={{ fontSize: 12, color: '#555', margin: 0 }}>{v.image_prompt}</p>
      </div>
      {flagged && (
        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--marker)' }} className="mono">
          ⚠ guardrail rewrote unsupported claim(s)
        </div>
      )}
    </div>
  );
}
