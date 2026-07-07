const Section = ({ id, title, children, activeSection, setActiveSection }) => {
  const isOpen = activeSection === id;
  const { motion, AnimatePresence } = window.Motion;
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 
        className="display" 
        onClick={() => setActiveSection(isOpen ? null : id)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: isOpen ? 'var(--ink)' : 'var(--muted)', marginBottom: 8, borderBottom: '1px solid var(--line)', paddingBottom: 8, transition: 'all 0.2s' }}
      >
        <span style={{ fontSize: 10, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        {title}
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8, paddingBottom: 8 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function BriefForm({ onGenerate, loading }) {
  const { useState } = React;
  
  const [brand, setBrand] = useState('NexWealth AI');
  const [product, setProduct] = useState('Joint budgeting dashboard');
  const [industry, setIndustry] = useState('Fintech');
  const [audience, setAudience] = useState('Young married couples in India');
  const [goal, setGoal] = useState('Lead Generation');
  const [platform, setPlatform] = useState('Multi-channel');
  const [tone, setTone] = useState('warm and reassuring');
  const [notes, setNotes] = useState('');
  
  const [activeSection, setActiveSection] = useState('brand');

  return (
    <div className="glass-card" style={{ marginBottom: 24, position: 'relative' }}>
      <h2 className="display" style={{ fontSize: 18, marginTop: 0, marginBottom: 24, fontWeight: 600 }}>
        Campaign Brief
      </h2>
      
      <Section id="brand" title="Brand Information" activeSection={activeSection} setActiveSection={setActiveSection}>
        <Field label="Brand"><input className="saas-input" value={brand} onChange={e => setBrand(e.target.value)} /></Field>
        <Field label="Product / Offer"><input className="saas-input" value={product} onChange={e => setProduct(e.target.value)} /></Field>
        <Field label="Industry"><input className="saas-input" value={industry} onChange={e => setIndustry(e.target.value)} /></Field>
      </Section>
      
      <Section id="audience" title="Audience & Strategy" activeSection={activeSection} setActiveSection={setActiveSection}>
        <Field label="Audience"><input className="saas-input" value={audience} onChange={e => setAudience(e.target.value)} /></Field>
        <Field label="Goal"><input className="saas-input" value={goal} onChange={e => setGoal(e.target.value)} /></Field>
        <Field label="Platform"><input className="saas-input" value={platform} onChange={e => setPlatform(e.target.value)} /></Field>
      </Section>
      
      <Section id="creative" title="Creative Preferences" activeSection={activeSection} setActiveSection={setActiveSection}>
        <Field label="Tone">
          <select className="saas-input" value={tone} onChange={e => setTone(e.target.value)}>
            <option>warm and reassuring</option>
            <option>confident</option>
            <option>playful</option>
            <option>premium and minimal</option>
            <option>urgent</option>
          </select>
        </Field>
        <Field label="Notes (optional)">
          <textarea className="saas-input" style={{ minHeight: 80, resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} />
        </Field>
      </Section>
      
      <button
        onClick={() => onGenerate({ brand, product, industry, audience, goal, platform, tone, notes })}
        disabled={loading}
        className="display btn-primary"
        style={{ marginTop: 8 }}
      >
        {loading ? 'Running Automation…' : 'Run Campaign Automation'}
      </button>
    </div>
  );
}
