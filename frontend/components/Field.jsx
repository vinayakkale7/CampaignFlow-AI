function Field({ label, children }) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)' }}>
        {label}
      </span>
      <div style={{ marginTop: 6 }}>{children}</div>
    </label>
  );
}
