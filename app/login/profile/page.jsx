// app/login/profile/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCurrentUser, updateUserProfile } from '../../Services/authService';
import '../profile/profile.css';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    zipcode: '',
    profileImage: '/iconos/perfilusuarios.png'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUserData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          country: data.country || '',
          zipcode: data.zipcode || '',
          profileImage: data.profileImage || '/iconos/perfilusuarios.png'
        });
      } catch (err) {
        setError(err.message || 'Error al cargar los datos del usuario');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUserProfile(userData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => window.history.back()}>
        ← Volver al Inicio
      </button>

      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar-wrapper">
            <Image
              src={userData.profileImage}
              alt="Foto de perfil"
              width={120}
              height={120}
              className="profile-avatar"
            />
          </div>
          <h1 className="profile-name">{userData.name}</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="profile-tabs">
        <button className="tab-btn active">Información</button>
      </div>

      <div className="tab-content">
        {error && <div className="auth-error">{error}</div>}
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>País</label>
              <select
                name="country"
                value={userData.country}
                onChange={handleInputChange}
              >
                <option value="">Selecciona un país</option>
                <option value="PE">Perú</option>
                <option value="MX">México</option>
                <option value="CO">Colombia</option>
                <option value="ES">España</option>
                <option value="US">Estados Unidos</option>
              </select>
            </div>

            <div className="form-group">
              <label>Código postal</label>
              <input
                type="text"
                name="zipcode"
                value={userData.zipcode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="auth-btn"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="auth-btn auth-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        ) : (
          <div className="info-content">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon"><i className="fas fa-user"></i></div>
                <div>
                  <div className="info-label">Nombre completo</div>
                  <div className="info-value">{userData.name}</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <div className="info-label">Correo electrónico</div>
                  <div className="info-value">{userData.email}</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fas fa-phone"></i></div>
                <div>
                  <div className="info-label">Teléfono</div>
                  <div className="info-value">{userData.phone || 'No especificado'}</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <div className="info-label">Dirección</div>
                  <div className="info-value">{userData.address || 'No especificada'}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="auth-btn auth-btn-primary"
            >
              Editar perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}