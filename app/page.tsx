"use client";
import React, { useState } from 'react';

export default function AgenciaManager() {
  const [view, setView] = useState('home'); 
  const [activeAccount, setActiveAccount] = useState('Pizzería Napoli');
  const [calendarEnabled, setCalendarEnabled] = useState(false);
  const [briefing, setBriefing] = useState({
    objetivo: 'Branding',
    frecuencia: '8',
    tono: 'Cercano',
    idioma: 'Castellano',
    prioridades: '',
    mix: { producto: 40, educativo: 20, social: 20, equipo: 10, promo: 10 }
  });

  const brands: any = {
    'Pizzería Napoli': { color: '#ef4444', font: 'serif' },
    'Clínica Dental': { color: '#0ea5e9', font: 'sans-serif' }
  };

  const s = {
    card: { backgroundColor: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222', marginBottom: '15px' },
    label: { fontSize: '11px', color: '#666', textTransform: 'uppercase' as const, letterSpacing: '1px', display: 'block', marginBottom: '8px' },
    input: { width: '100%', backgroundColor: '#000', border: '1px solid #333', borderRadius: '10px', padding: '12px', color: 'white', marginBottom: '15px', outline: 'none' }
  };

  // VISTA: CONFIGURACIÓN DEL BRIEFING (Basado en tu estructura)
  if (view === 'briefing') return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white'}}>
      <div style={{maxWidth: '450px', margin: '0 auto'}}>
        <button onClick={() => setView('home')} style={{color: '#666', background: 'none', border: 'none', cursor: 'pointer'}}>← Cancelar</button>
        <h1 style={{fontSize: '24px', margin: '20px 0'}}>Briefing: Noviembre</h1>
        
        <div style={s.card}>
          <label style={s.label}>Objetivo Principal</label>
          <select style={s.input} onChange={(e) => setBriefing({...briefing, objetivo: e.target.value})}>
            <option>Reservas / Leads</option>
            <option>Ventas Web</option>
            <option>Branding</option>
            <option>Comunidad</option>
          </select>

          <label style={s.label}>Prioridades Comerciales (Evita lo genérico)</label>
          <textarea 
            placeholder="Ej: Solo 20 unidades, citas limitadas..." 
            style={{...s.input, height: '80px'}} 
            onChange={(e) => setBriefing({...briefing, prioridades: e.target.value})}
          />

          <label style={s.label}>Frecuencia / Formatos</label>
          <div style={{display: 'flex', gap: '10px'}}>
            <select style={s.input}><option>8 Posts</option><option>12 Posts</option><option>16 Posts</option></select>
            <select style={s.input}><option>4 Reels</option><option>6 Reels</option></select>
          </div>

          <label style={s.label}>Tono e Idioma</label>
          <div style={{display: 'flex', gap: '10px'}}>
            <select style={s.input}><option>Friendly</option><option>Premium</option><option>Directo</option></select>
            <select style={s.input}><option>Castellano</option><option>Català</option><option>Mixto</option></select>
          </div>
        </div>

        <button 
          onClick={() => { setCalendarEnabled(true); setView('home'); }}
          style={{width: '100%', padding: '18px', backgroundColor: '#fff', color: '#000', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}
        >
          GENERAR CALENDARIO ESTRATÉGICO ✨
        </button>
      </div>
    </div>
  );

  return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{maxWidth: '420px', margin: '0 auto'}}>
        <header style={{marginBottom: '30px'}}>
          <select onChange={(e) => setActiveAccount(e.target.value)} style={{background: 'none', color: '#fff', border: 'none', fontSize: '24px', fontWeight: '900', outline: 'none'}}>
            <option style={{color: '#000'}}>Pizzería Napoli</option>
            <option style={{color: '#000'}}>Clínica Dental</option>
          </select>
          <p style={{fontSize: '10px', color: brands[activeAccount].color, letterSpacing: '2px', fontWeight: 'bold', marginTop: '5px'}}>AGENCY DASHBOARD</p>
        </header>

        {/* MODULO OPCIONAL DE CALENDARIO */}
        <div style={{...s.card, border: calendarEnabled ? `1px solid ${brands[activeAccount].color}` : '1px solid #222'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h3 style={{margin: 0, fontSize: '16px'}}>Calendario Editorial</h3>
              <p style={{fontSize: '11px', color: '#666', margin: '4px 0 0 0'}}>Activar planificación mensual</p>
            </div>
            <input 
              type="checkbox" 
              checked={calendarEnabled} 
              onChange={() => !calendarEnabled ? setView('briefing') : setCalendarEnabled(false)}
              style={{width: '20px', height: '20px'}}
            />
          </div>

          {calendarEnabled && (
            <div style={{marginTop: '20px', borderTop: '1px solid #222', paddingTop: '15px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '10px'}}>
                <span>Posts planificados:</span>
                <span style={{color: brands[activeAccount].color, fontWeight: 'bold'}}>0 / {briefing.frecuencia}</span>
              </div>
              <button onClick={() => setView('calendar')} style={{width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '12px', cursor: 'pointer'}}>VER CALENDARIO COMPLETO →</button>
            </div>
          )}
        </div>

        {/* GENERADOR NORMAL (Siempre disponible) */}
        <section onClick={() => setView('create')} style={{backgroundColor: brands[activeAccount].color, padding: '25px', borderRadius: '25px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>
          <h2 style={{margin: 0, fontSize: '18px'}}>+ Post Express</h2>
          <p style={{fontSize: '11px', opacity: 0.8, marginTop: '5px'}}>Sin planificación previa</p>
        </section>
      </div>
    </div>
  );
}
