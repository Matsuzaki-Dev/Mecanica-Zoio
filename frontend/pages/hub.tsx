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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Hub — Novidades da Oficina</h1>
        <div className="text-sm text-gray-500">Últimas promoções e preços atualizados</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-medium mb-3">Novidades</h2>
          <ul className="news-list">
            {news.map(n=> (<li key={n.id} className="mb-3"><strong className="block">{n.title}</strong><p className="text-sm text-gray-600">{n.body}</p></li>))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-lg font-medium mb-3">Preços de Peças</h2>
          {loading ? <p className="text-sm text-gray-500">Carregando...</p> : (
            <div className="overflow-auto">
              <table className="table w-full">
                <thead><tr><th className="text-left text-sm text-gray-500 p-2">SKU</th><th className="text-left text-sm text-gray-500 p-2">Nome</th><th className="text-left text-sm text-gray-500 p-2">Preço</th></tr></thead>
                <tbody>
                  {parts.map(p=> (
                    <tr key={p.id} className="odd:bg-gray-50"><td className="p-2">{p.sku}</td><td className="p-2">{p.name}</td><td className="p-2">{fmt(p.price)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
