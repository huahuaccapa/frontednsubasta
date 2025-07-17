// app/login/callback/page.jsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAuthToken } from '../../utils/auth';
import { oauthSuccess } from '../../Services/oauthService';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');
      
      if (error) {
        router.push(`/login?error=${encodeURIComponent(error)}`);
        return;
      }

      if (token) {
        try {
          // Verificar el token con el backend
          await oauthSuccess();
          
          // Almacenar el token
          setAuthToken(token);
          
          // Redirigir a la página original o al home
          const redirectUrl = searchParams.get('redirect') || '/';
          router.push(redirectUrl);
        } catch (err) {
          router.push(`/login?error=${encodeURIComponent(err.message || 'oauth_failed')}`);
        }
      } else {
        router.push('/login?error=oauth_failed');
      }
    };

    handleOAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Procesando autenticación...</p>
    </div>
  );
}