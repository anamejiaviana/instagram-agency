"use client";
import React, { useState } from 'react';

export default function AgenciaEstrategiaApp() {
  const [view, setView] = useState('home'); 
  const [activeAccount, setActiveAccount] = useState('Pizzería Napoli');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const brands: any = {
    'Pizzería Napoli': { color: '#ef4444', desc: 'Tradición italiana' },
    'Clínica Dental': { color: '#0ea5e9', desc: 'Salud dental avanzada' }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  if (view === 'create') return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        <button onClick={() => setView('home')} style={{background: 'none', color: '#666', border: 'none', cursor: 'pointer', marginBottom: '20px'}}>← Volver</button>
        <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Nueva Estrategia</h1>
        
        <label style={{display: 'block', marginTop: '20px', fontSize: '12px', color: '#666'}}>1. SUBIR TU IMAGEN (OPCIONAL)</label>
        <input type="file" onChange={handleImageUpload} style={{marginTop: '10px', fontSize: '12px'}} />
        
        <label style={{display: 'block', marginTop: '20px', fontSize: '12px', color: '#666'}}>2. ¿QUÉ QUIERES COMUNICAR?</label>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Promoción de limpieza dental..." 
          style={{width: '100%', height: '100px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '15px', padding: '15px', color: 'white', marginTop: '10px', outline: 'none'}}
        />
        
        <button 
          onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setView('result'); }, 1500); }} 
          style={{width: '100%', padding: '18px', backgroundColor: brands[activeAccount].color, border: 'none', borderRadius: '15px', color: 'white', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer'}}
        >
          {loading ? 'PLANIFICANDO...' : 'GENERAR POST'}
        </button>
      </div>
    </div>
  );

  if (view === 'result') return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        <h1 style={{fontSize: '22px', fontWeight: 'bold'}}>Propuesta de Post</h1>
        
        <div style={{width: '100%', aspectRatio: '1/1', backgroundColor: '#111', borderRadius: '20px', margin: '20px 0', overflow: 'hidden', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {uploadedImage ? (
            <img src={uploadedImage} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          ) : (
            <div style={{padding: '30px', textAlign: 'center'}}>
              <p style={{color: brands[activeAccount].color, fontWeight: 'bold'}}>💡 IDEA VISUAL:</p>
              <p style={{fontSize: '13px', color: '#999'}}>Muestra un plano detalle de {prompt} con iluminación natural y los colores corporativos de {activeAccount}.</p>
            </div>
          )}
        </div>

        <div style={{backgroundColor: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222'}}>
          <p style={{fontSize: '14px', margin: 0, lineHeight: '1.6'}}>
            <b>Copy Sugerido:</b><br/>
            ¿Sabías que en {activeAccount} nos tomamos muy en serio tu satisfacción? Hoy hablamos de {prompt}. ¡Haz clic en el link de la bio! 🚀
          </p>
        </div>

        <button onClick={() => {setView('home'); setPrompt(''); setUploadedImage(null);}} style={{width: '100%', padding: '15px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '15px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer'}}>GUARDAR EN CALENDARIO</button>
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
          <h2 style={{margin: 0}}>+ Crear Estrategia</h2>
        </div>
      </div>
    </div>
  );
}
