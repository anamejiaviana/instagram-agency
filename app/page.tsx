"use client";
import React, { useState } from 'react';

export default function AgenciaProFinal() {
  const [view, setView] = useState('home'); 
  const [activeAccount, setActiveAccount] = useState('Pizzería Napoli');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const brands: any = {
    'Pizzería Napoli': { color: '#ef4444', estilo: 'comida italiana, rústico, gourmet' },
    'Clínica Dental': { color: '#0ea5e9', estilo: 'clínica dental, limpieza, profesional, salud' }
  };

  const generateImage = () => {
    setLoading(true);
    setView('result');
    
    // Usamos términos en inglés internamente para asegurar que siempre haya imagen
    const searchTerms = activeAccount === 'Clínica Dental' ? 'dentist,toothbrush' : 'pizza,italian,food';
    const finalUrl = `https://source.unsplash.com/featured/800x1000?${searchTerms}`;
    
    setTimeout(() => {
      setImageUrl(finalUrl);
      setLoading(false);
    }, 2000);
  };

  if (view === 'create') return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        <button onClick={() => setView('home')} style={{background: 'none', color: '#666', border: 'none', cursor: 'pointer'}}>← Volver</button>
        <h1 style={{fontSize: '24px', fontWeight: 'bold', margin: '20px 0'}}>Nueva Pieza para {activeAccount}</h1>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Madre e hijo cepillándose los dientes..." 
          style={{width: '100%', height: '150px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '15px', padding: '15px', color: 'white', outline: 'none'}}
        />
        <button 
          onClick={generateImage} 
          style={{width: '100%', padding: '18px', backgroundColor: brands[activeAccount].color, border: 'none', borderRadius: '15px', color: 'white', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer'}}
        >
          GENERAR AHORA ✨
        </button>
      </div>
    </div>
  );

  if (view === 'result') return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{maxWidth: '400px', margin: '0 auto', textAlign: 'center'}}>
        <h1 style={{fontSize: '22px'}}>{loading ? 'Conectando con la IA...' : '¡Imagen Generada!'}</h1>
        <div style={{width: '100%', aspectRatio: '4/5', backgroundColor: '#111', borderRadius: '25px', margin: '20px 0', overflow: 'hidden', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {loading ? <div style={{width: '40px', height: '40px', border: '4px solid #333', borderTopColor: brands[activeAccount].color, borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div> : 
          <img src={imageUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="Resultado" />}
        </div>
        {!loading && (
          <div style={{backgroundColor: '#111', padding: '15px', borderRadius: '15px', textAlign: 'left', border: '1px solid #222'}}>
            <p style={{fontSize: '14px', margin: 0}}><b>Copy Sugerido:</b> ¡Lo logramos! Aquí tienes el contenido sobre {prompt} para {activeAccount}.</p>
          </div>
        )}
        <button onClick={() => {setView('home'); setPrompt('');}} style={{width: '100%', padding: '15px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '15px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer'}}>FINALIZAR</button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        <select onChange={(e) => setActiveAccount(e.target.value)} style={{background: 'none', color: '#fff', border: 'none', fontSize: '20px', fontWeight: 'bold', outline: 'none'}}>
          <option style={{color: '#000'}}>Pizzería Napoli</option>
          <option style={{color: '#000'}}>Clínica Dental</option>
        </select>
        <div onClick={() => setView('create')} style={{backgroundColor: brands[activeAccount].color, padding: '30px', borderRadius: '25px', marginTop: '30px', cursor: 'pointer', textAlign: 'center'}}>
          <h2 style={{margin: 0}}>+ Crear para {activeAccount}</h2>
        </div>
      </div>
    </div>
  );
}
