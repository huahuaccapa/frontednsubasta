// app/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './componets/Header';
import DetalleArticle from './detail-article/page';
import ChatbotBox from './componets/ChatbotBox';
import { getAuctions } from './Services/auctionService';
import './styles/global.css';

export default function Homepage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAuctions();
        setAuctions(data);
      } catch (err) {
        setError(err.message || 'Error al cargar subastas');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <Header />
        <main className="main-content">
          <p>Cargando subastas...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Header />
        <main className="main-content">
          <p className="error">{error}</p>
        </main>
      </div>
    );
  }

  const featuredAuctions = auctions.filter(a => a.featured);
  const endingSoonAuctions = auctions.filter(a => new Date(a.endDate).getTime() - Date.now() < 86400000); // Menos de 24 horas
  const recentAuctions = [...auctions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="dashboard">
      <Header />
      <main className="main-content">
        <section className="auction-section">
          <div className="section-header">
            <h2>Subastas Destacadas</h2>
            <Link href="/auctions" className="see-all">Ver todo</Link>
          </div>
          
          <div className="auctions-grid">
            {featuredAuctions.map(auction => (
              <div 
                key={auction.id} 
                className="auction-card" 
                onClick={() => setSelectedItem(auction)}
              >
                {auction.featured && <div className="auction-badge">Destacado</div>}
                <img src={auction.product.imageUrl} alt={auction.product.name} />
                <div className="auction-info">
                  <h3>{auction.product.name}</h3>
                  <p className="subtitle">{auction.product.category}</p>
                  <div className="price-section">
                    <span className="price">S/ {auction.currentPrice || auction.initialPrice}</span>
                    <span className="bids">{auction.bidCount} pujas</span>
                  </div>
                  <div className="auction-footer">
                    <span className="seller">
                      <i className="fas fa-user"></i> {auction.product.user?.name || 'Vendedor'}
                    </span>
                    <span className="time">
                      <i className="fas fa-clock"></i> {formatTimeLeft(auction.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="auction-section">
          <div className="section-header">
            <h2>Finalizando Pronto</h2>
            <Link href="/auctions?filter=ending" className="see-all">Ver todo</Link>
          </div>
          
          <div className="auctions-grid">
            {endingSoonAuctions.map(auction => (
              <div 
                key={auction.id} 
                className="auction-card" 
                onClick={() => setSelectedItem(auction)}
              >
                <img src={auction.product.imageUrl} alt={auction.product.name} />
                <div className="auction-info">
                  <h3>{auction.product.name}</h3>
                  <p className="subtitle">{auction.product.category}</p>
                  <div className="price-section">
                    <span className="price">S/ {auction.currentPrice || auction.initialPrice}</span>
                    <span className="bids">{auction.bidCount} pujas</span>
                  </div>
                  <div className="auction-footer">
                    <span className="seller">
                      <i className="fas fa-user"></i> {auction.product.user?.name || 'Vendedor'}
                    </span>
                    <span className="time ending-soon">
                      <i className="fas fa-clock"></i> {formatTimeLeft(auction.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="auction-section">
          <div className="section-header">
            <h2>Subastas Recientes</h2>
            <Link href="/auctions?filter=recent" className="see-all">Ver todo</Link>
          </div>

          <div className="auctions-grid">
            {recentAuctions.map(auction => (
              <div 
                key={auction.id} 
                className="auction-card" 
                onClick={() => setSelectedItem(auction)}
              >
                <div className="auction-badge">Nuevo</div>
                <img src={auction.product.imageUrl} alt={auction.product.name} />
                <div className="auction-info">
                  <h3>{auction.product.name}</h3>
                  <p className="subtitle">{auction.product.category}</p>
                  <div className="price-section">
                    <span className="price">S/ {auction.currentPrice || auction.initialPrice}</span>
                    <span className="bids">{auction.bidCount} pujas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedItem && (
        <DetalleArticle 
          item={selectedItem} 
          isOpen={Boolean(selectedItem)} 
          toggleDetails={() => setSelectedItem(null)} 
        />
      )}
      <ChatbotBox />
    </div>
  );
}

function formatTimeLeft(endDate) {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end - now;
  
  if (diff <= 0) return 'Finalizada';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  
  return `${hours}h ${minutes}m`;
}