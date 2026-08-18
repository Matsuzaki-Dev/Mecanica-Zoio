import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState(null as string | null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY || '',
        },
        body: JSON.stringify({ name, email, phone }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMsg('Cadastro realizado com sucesso. ID: ' + data.id);
      setName(''); setEmail(''); setPhone('');
    } catch (err: any) {
      setMsg('Erro: ' + (err.message || err));
    }
  }

  return (
    <main style={{padding:32}}>
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:480}}>
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} required/></label>
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
        <label>Phone<input value={phone} onChange={e=>setPhone(e.target.value)} /></label>
        <button type="submit">Cadastrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}
