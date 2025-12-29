"use client";
import React, { useState } from 'react';

// ESTRUCTURA DE LA APP DE AGENCIA PROFESIONAL
export default function AgenciaDigitalApp() {
  const [view, setView] = useState('home'); // home, brief, create, result, settings
  const [activeAccount, setActiveAccount] = useState('Pizzería Napoli');
  const [status, setStatus] = useState('PENDIENTE');
  const [prompt, setPrompt] = useState('');

  // CONFIGURACIÓN DE MARCAS (Esto irá a una base de datos online)
  const brands: any = {
    'Pizzería Napoli': { color: '#3b82f6', desc: 'Tradición italiana a la leña.', tono: 'Cercano' },
    'Clínica Dental': { color: '#10b981', desc: 'Salud y estética avanzada.', tono: 'Profesional' }
  };

  const s = {
    wrapper: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'start', fontFamily: 'sans-serif', color: 'white' },
    phone: { width: '100%', maxWidth: '420px', backgroundColor: '#0D0D0D', minHeight: '100vh', padding: '30px', position: 'relative' as const, borderRight: '1px solid #222', borderLeft: '1px solid #222' },
    card: { backgroundColor: '#161616', borderRadius: '24px', padding: '20px', border: '1px solid #222', marginBottom: '20px' },
    btn: (bg: string, col: string) => ({ backgroundColor: bg, color: col, border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold' as const, cursor: 'pointer', width: '100%' })
  };

  // VISTA: BRIEFING (Lógica RELLENAR)
  if (view === 'brief') {
    return (
      <div style={s.wrapper}>
        <div style={s.phone}>
          <button onClick={() => setView('home')} style={{color: '#666', background: 'none', border: 'none', marginBottom: '20px'}}>← Volver</button>
          <h1 style={{fontSize: '24px', fontWeight: '900'}}>Estrategia Noviembre</h1>
          <p style={{color: brands[activeAccount].color, fontSize: '12px', fontWeight: 'bold'}}>{activeAccount.toUpperCase()}</p>
          <div style={{marginTop: '30px'}}>
            <label style={{fontSize: '10px', color: '#444'}}>OBJETIVO DEL MES</label>
            <textarea style={{width: '100%', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '15px', padding: '15px', color: 'white', marginTop: '10px', height: '100px'}} placeholder="Ej: Aumentar reservas de cenas..." />
            <button onClick={() => {setStatus('ENVIADO'); setView('home');}} style={{...s.btn('#fff', '#000'), marginTop: '20px'}}>GUARDAR Y NOTIFICAR</button>
          </div>
        </div>
      </div>
    );
  }

  // VISTA: GENERADOR (Nano Banana)
  if (view === 'create') {
    return (
      <div style={s.wrapper}>
        <div style={s.phone}>
          <button onClick={() => setView('home')} style={{color: '#666', background: 'none', border: 'none', marginBottom: '20px'}}>← Cancelar</button>
          <h1 style={{fontSize: '24px', fontWeight: '900'}}>IA Creator</h1>
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            style={{width: '100%', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '15px', padding: '15px', color: 'white', marginTop: '20px', height: '150px'}} 
            placeholder="Describe la imagen..." 
          />
          <button onClick={() => setView('result')} style={{...s.btn(brands[activeAccount].color, '#fff'), marginTop: '20px'}}>GENERAR PIEZA ✨</button>
        </div>
      </div>
    );
  }

  // VISTA: RESULTADO
  if (view === 'result') {
    return (
      <div style={s.wrapper}>
        <div style={s.phone}>
          <h1 style={{fontSize: '24px', fontWeight: '900'}}>Propuesta</h1>
          <div style={{width: '100%', aspectRatio: '4/5', backgroundColor: '#111', borderRadius: '24px', margin: '20px 0', border: `2px solid ${brands[activeAccount].color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px'}}>
            <p style={{fontSize: '12px', color: '#666'}}>Aquí aparecerá la imagen de Nano Banana para:<br/><b>{prompt}</b></p>
          </div>
          <div style={s.card}>
            <p style={{fontSize: '13px', lineHeight: '1.6'}}><b>Copy:</b> ¡Hola seguidores de {activeAccount}! Hoy os traemos {prompt}. ¡No te lo pierdas!</p>
          </div>
          <button onClick={() => {setView('home'); setPrompt('');}} style={s.btn('#fff', '#000')}>FINALIZAR</button>
        </div>
      </div>
    );
  }

  // HOME PRINCIPAL
  return (
    <div style={s.wrapper}>
      <div style={s.phone}>
        <header style={{marginBottom: '40px'}}>
          <select 
            onChange={(e) => setActiveAccount(e.target.value)} 
            style={{backgroundColor: 'transparent', color: 'white', border: 'none', fontSize: '24px', fontWeight: '900', outline: 'none'}}
          >
            <option style={{color: '#000'}}>Pizzería Napoli</option>
            <option style={{color: '#000'}}>Clínica Dental</option>
          </select>
          <div style={{fontSize: '10px', color: brands[activeAccount].color, fontWeight: 'bold', letterSpacing: '2px', marginTop: '5px'}}>DASHBOARD AGENCIA</div>
        </header>

        <section onClick={() => setView('create')} style={{backgroundColor: brands[activeAccount].color, padding: '30px', borderRadius: '25px', cursor: 'pointer', marginBottom: '30px'}}>
          <h2 style={{margin: 0, fontSize: '20px'}}>+ Crear Post</h2>
          <p style={{margin: '5px 0 0 0', fontSize: '12px', opacity: 0.8}}>Generar contenido para {activeAccount}</p>
        </section>

        <div style={s.card}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <p style={{margin: 0, fontWeight: 'bold'}}>Noviembre</p>
              <p style={{margin: '5px 0 0 0', fontSize: '10px', color: status === 'PENDIENTE' ? '#f59e0b' : '#10b981'}}>● {status}</p>
            </div>
            {status === 'PENDIENTE' && <button onClick={() => setView('brief')} style={{backgroundColor: '#fff', border: 'none', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold', fontSize: '10px'}}>RELLENAR</button>}
          </div>
        </div>

        <nav style={{position: 'absolute', bottom: '30px', left: '30px', right: '30px', backgroundColor: '#161616', height: '70px', borderRadius: '25px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid #333'}}>
          <span>🏠</span>
          <span style={{opacity: 0.2}}>📅</span>
          <span style={{opacity: 0.2}}>⚙️</span>
        </nav>
      </div>
    </div>
  );
}
