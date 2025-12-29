"use client";
import React, { useState } from 'react';

export default function AppAgenciaPro() {
  const [view, setView] = useState('home'); 
  const [activeAccount, setActiveAccount] = useState('Pizzería Napoli');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const brands: any = {
    'Pizzería Napoli': { color: '#ef4444', desc: 'Pizza artesanal a la leña', estilo: 'Cálido, rústico, apetecible' },
    'Clínica Dental': { color: '#0ea5e9', desc: 'Odontología moderna y estética', estilo: 'Limpio, profesional, minimalista' }
  };

  const s = {
    wrapper: { backgroundColor: '#000', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' },
    phone: { maxWidth: '420px', margin: '0 auto', backgroundColor: '#0D0D0D', minHeight: '100vh', padding: '25px', position: 'relative' as const },
    btn: (bg: string) => ({ backgroundColor: bg, color: bg === '#fff' ? '#000' : '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 'bold' as const, width: '100%', cursor: 'pointer' }),
    input: { width: '100%', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '15px', padding: '15px', color: 'white', marginTop: '10px', fontSize: '14px', outline: 'none' }
  };

  const generateAI = async () => {
    setLoading(true);
    setView('result');
    
    // Aquí es donde la app usará la API Key que pusiste en Vercel
    // Por ahora simulamos la respuesta pro, pero el código ya está listo para recibir la URL de Nano Banana
    setTimeout(() => {
      setResult({
        image: `https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=800`, // Placeholder pro hasta el primer redeploy con API
        copy: `✨ [ESTILO: ${brands[activeAccount].estilo}]\n\n¿Buscas la perfección en cada detalle? En ${activeAccount} entendemos que ${prompt} es la clave.\n\nComo expertos en ${brands[activeAccount].desc}, hemos creado esta pieza pensando en ti. ¡La calidad no es negociable!\n\n💬 Cuéntanos qué te parece en los comentarios.\n\n#${activeAccount.replace(/\s/g,'')} #IA #MarketingPro`
      });
      setLoading(false);
    }, 2500);
  };

  if (view === 'create') return (
    <div style={s.wrapper}><div style={s.phone}>
      <button onClick={() => setView('home')} style={{background: 'none', color: '#666', border: 'none', marginBottom: '20px'}}>← Volver</button>
      <h1 style={{fontSize: '28px', fontWeight: '900'}}>IA Creator</h1>
      <p style={{fontSize: '14px', color: '#666'}}>Generando para <b style={{color: brands[activeAccount].color}}>{activeAccount}</b></p>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ej: Niño cepillándose los dientes con una sonrisa..." 
        style={{...s.input, height: '150px', marginTop: '20px'}}
      />
      <button onClick={generateAI} style={{...s.btn(brands[activeAccount].color), marginTop: '20px'}}>GENERAR CON NANO BANANA ✨</button>
    </div></div>
  );

  if (view === 'result') return (
    <div style={s.wrapper}><div style={s.phone}>
      <h1 style={{fontSize: '24px', fontWeight: '900'}}>{loading ? 'Creando arte...' : 'Resultado Final'}</h1>
      <div style={{width: '100%', aspectRatio: '4/5', backgroundColor: '#111', borderRadius: '24px', margin: '20px 0', border: '1px solid #222', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {loading ? <div className="spinner"></div> : <img src={result?.image} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
      </div>
      {!loading && (
        <div style={{backgroundColor: '#161616', padding: '20px', borderRadius: '20px', border: '1px solid #222'}}>
          <p style={{fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap'}}>{result?.copy}</p>
        </div>
      )}
      <button onClick={() => setView('home')} style={{...s.btn('#fff'), marginTop: '20px'}}>LISTO</button>
    </div></div>
  );

  return (
    <div style={s.wrapper}><div style={s.phone}>
      <header style={{marginBottom: '40px'}}>
        <select onChange={(e) => setActiveAccount(e.target.value)} style={{background: 'none', color: '#fff', border: 'none', fontSize: '24px', fontWeight: '900', outline: 'none'}}>
          <option style={{color: '#000'}}>Pizzería Napoli</option>
          <option style={{color: '#000'}}>Clínica Dental</option>
        </select>
        <div style={{fontSize: '10px', color: brands[activeAccount].color, fontWeight: 'bold', letterSpacing: '2px', marginTop: '5px'}}>DASHBOARD V1.0</div>
      </header>

      <section onClick={() => setView('create')} style={{backgroundColor: brands[activeAccount].color, padding: '30px', borderRadius: '30px', cursor: 'pointer', marginBottom: '30px', boxShadow: `0 10px 30px ${brands[activeAccount].color}33`}}>
        <h2 style={{margin: 0}}>+ Crear Contenido</h2>
        <p style={{margin: '5px 0 0 0', opacity: 0.8, fontSize: '13px'}}>Impulsa tu marca con IA</p>
      </section>

      <div style={{backgroundColor: '#161616', padding: '20px', borderRadius: '25px', border: '1px solid #222'}}>
        <p style={{margin: 0, fontWeight: 'bold'}}>Estrategia Mensual</p>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px'}}>
          <span style={{fontSize: '12px', color: '#666'}}>Noviembre</span>
          <button style={{backgroundColor: '#fff', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold'}}>RELLENAR</button>
        </div>
      </div>
    </div></div>
  );
}
