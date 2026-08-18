import React, { useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
  const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  function validate() {
    if (!name || name.trim().length < 2) return 'Nome precisa ter ao menos 2 caracteres.';
    if (!email || !emailRegex.test(email)) return 'Email inválido.';
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || undefined }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text || 'Erro na requisição');
      const data = JSON.parse(text);
      setMsg('Cadastro realizado com sucesso. ID: ' + data.id);
      setName(''); setEmail(''); setPhone('');
    } catch (err: any) {
      setError(err.message || String(err));
    } finally { setLoading(false); }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="h1">Cadastro de Cliente</h1>
          <div className="small-muted">Formulário protegido por API key</div>
        </div>

        <form onSubmit={submit}>
          <div className="form-row">
            <label>Nome</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Nome completo" />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@exemplo.com" />
          </div>

          <div className="form-row">
            <label>Telefone</label>
            <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(11) 9xxxx-xxxx" />
          </div>

          {error && <div className="error" style={{marginBottom:12}}>{error}</div>}
          {msg && <div className="success" style={{marginBottom:12}}>{msg}</div>}

          <div style={{display:'flex',gap:8}}>
            <button className="btn" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</button>
            <button type="button" className="btn" style={{background:'#64748b'}} onClick={()=>{ setName(''); setEmail(''); setPhone(''); setMsg(null); setError(null); }}>
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
