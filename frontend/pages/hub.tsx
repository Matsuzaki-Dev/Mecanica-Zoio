import React, { useEffect, useState } from 'react';

type Part = { id:string, name:string, sku:string, price:string };

export default function Hub(){
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/parts`);
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

  return (
    <main style={{padding:32}}>
      <h1>Hub — Novidades da Oficina</h1>
      <section style={{display:'flex',gap:24}}>
        <div style={{flex:1}}>
          <h2>Novidades</h2>
          <ul>
            {news.map(n=> (<li key={n.id}><strong>{n.title}</strong><p>{n.body}</p></li>))}
          </ul>
        </div>
        <div style={{flex:1}}>
          <h2>Preços de Peças</h2>
          {loading ? <p>Carregando...</p> : (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr><th>SKU</th><th>Nome</th><th>Preço</th></tr></thead>
              <tbody>
                {parts.map(p=> (
                  <tr key={p.id}><td>{p.sku}</td><td>{p.name}</td><td>R$ {p.price}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}
