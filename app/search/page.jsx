//app\search\page.jsx
'use client';

import React from 'react';
import Header from '../componets/Header';
import './search.css';

export default function SearchPage() {
  return (
    <div>
      <Header />
      <main className="maintenance-container">
        <h1 className="maintenance-title">🔧 Página en mantenimiento</h1>
        <p className="maintenance-subtitle">
          Estamos trabajando para mejorar la experiencia de búsqueda.
        </p>
        <p className="maintenance-subtitle">Por favor, vuelve más tarde. 🙏</p>
      </main>
    </div>
  );
}
