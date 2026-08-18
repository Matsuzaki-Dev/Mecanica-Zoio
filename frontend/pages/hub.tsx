import React, { useEffect, useState } from 'react';

type Part = { id:string, name:string, sku:string, price:string };

export default function Hub(){
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch(`${BASE}/parts`);
        if (!res.ok) throw new Error('Failed to fetch parts');
        const data = await res.json();
        setParts(data.map((p:any)=>({ id:p.id, name:p.name, sku:p.sku, price:p.price })));
      }catch(e){ console.error(e); }
      setLoading(false);
    })();
  },[]);

  const news = [
    { id:1, title:'Limpeza de injetores com desconto', body:'10% de desconto em serviço de limpeza até fim do mês.' },
    { id:2, title:'Alinhamento e balanceamento', body:'Pacote promocional com 15% off para 2 serviços.' }
  ];

  const fmt = (v:string|number)=> new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v));

  return (
    <div className="container">
      <div className="header">
        <h1 className="h1">Hub — Novidades da Oficina</h1>
        <div className="small-muted">Últimas promoções e preços atualizados</div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Novidades</h2>
          <ul className="news-list">
            {news.map(n=> (<li key={n.id}><strong>{n.title}</strong><p className="small-muted">{n.body}</p></li>))}
          </ul>
        </div>

        <div className="card">
          <h2>Preços de Peças</h2>
          {loading ? <p className="small-muted">Carregando...</p> : (
            <table className="table">
              <thead><tr><th>SKU</th><th>Nome</th><th>Preço</th></tr></thead>
              <tbody>
                {parts.map(p=> (
                  <tr key={p.id}><td>{p.sku}</td><td>{p.name}</td><td>{fmt(p.price)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
