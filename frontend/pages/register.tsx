import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

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
      <Card className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Cadastro de Cliente</h1>
          <div className="text-sm text-gray-500">Formulário protegido por API key</div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Input label="Nome" value={name} onChange={e=>setName(e.target.value)} placeholder="Nome completo" />
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@exemplo.com" />
          <Input label="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(11) 9xxxx-xxxx" />

          {error && <div className="text-sm text-red-600">{error}</div>}
          {msg && <div className="text-sm text-green-700">{msg}</div>}

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</Button>
            <Button type="button" variant="secondary" onClick={()=>{ setName(''); setEmail(''); setPhone(''); setMsg(null); setError(null); }}>
              Limpar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
