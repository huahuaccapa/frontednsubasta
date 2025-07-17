'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleOAuthCallback } from '../../Services/oauthService';
import Image from 'next/image';
import '../../styles/login1.css';

export default function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    console.log('Token recibido:', token); // Depuración
    console.log('Error recibido:', errorParam); // Depuración

    // Manejar errores primero
    if (errorParam) {
      const decodedError = decodeURIComponent(errorParam);
      setError(decodedError);
      setTimeout(() => {
        router.push(`/login?error=${encodeURIComponent(decodedError)}`);
      }, 3000);
      return;
    }

    // Si no hay token, redirigir a login
    if (!token) {
      console.error('No se encontró token en la URL');
      router.push('/login');
      return;
    }

    // Procesar el token y redirigir
    const processAuth = async () => {
      try {
        const redirectUrl = await handleOAuthCallback(token);
        const safeRedirectUrl = redirectUrl || '/'; // Fallback a la página principal
        console.log('Redirigiendo a:', safeRedirectUrl); // Depuración
        router.push(safeRedirectUrl);
      } catch (err) {
        console.error('Error procesando autenticación:', err);
        setError('Error al iniciar sesión');
        router.push('/login');
      }
    };

    processAuth();
  }, [searchParams, router]);

  return (
    <div className="auth-container">
      <div className="auth-card text-center">
        <div className="auth-header">
          <div className="auth-logo">
            <Image 
              src="/iconos/iniciosesiongoole.png" 
              alt="Logo" 
              width={80} 
              height={80}
            />
          </div>
          <h1 className="auth-title">
            {error ? 'Error en autenticación' : 'Procesando autenticación...'}
          </h1>
        </div>

        <div className="py-8">
          {error ? (
            <>
              <div className="text-red-500 mb-4">
                <i className="fas fa-exclamation-circle text-4xl"></i>
              </div>
              <p className="text-lg mb-4">{error}</p>
              <p>Serás redirigido al login...</p>
            </>
          ) : (
            <>
              <div className="animate-spin mb-4">
                <i className="fas fa-spinner text-4xl text-blue-500"></i>
              </div>
              <p>Por favor espera mientras completamos tu autenticación.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}