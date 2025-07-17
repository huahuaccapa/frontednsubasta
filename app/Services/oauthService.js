import api from './api';

export const handleOAuthRedirect = (provider = 'google') => {
  // Guardar la URL actual para redirigir después del login
  sessionStorage.setItem('preAuthUrl', window.location.pathname);
  
  // Redirigir al backend para iniciar el flujo OAuth
  window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
};

export const handleOAuthCallback = async (token) => {
  try {
    if (!token) {
      console.error('No se recibió token en el callback');
      return '/login';
    }

    // Guardar el token en localStorage
    localStorage.setItem('authToken', token);
    
    // Obtener la URL guardada o redirigir a la página principal
    const redirectUrl = sessionStorage.getItem('preAuthUrl') || '/';
    sessionStorage.removeItem('preAuthUrl'); // Limpiar después de usar

    console.log('Redirigiendo a:', redirectUrl); // Depuración
    return redirectUrl;
  } catch (error) {
    console.error('Error en handleOAuthCallback:', error);
    return '/login?error=oauth_failed';
  }
};

export const getOAuthProviders = async () => {
  try {
    const response = await api.get('/api/auth/providers');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo proveedores OAuth:', error);
    return [];
  }
};