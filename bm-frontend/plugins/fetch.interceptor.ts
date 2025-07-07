/*
Interceptor se encargara de agarrar las peticiones a la API
primero le incluira a cada pericion el header de language y las credenciales
y luego en caso de que la peticion falle por un 401 (token expirado)
realizara el refresh del token si es valido realizara la peticion incial nuevamente
si no se redirigira al usuario a la pagina de inicio
*/

import { defineNuxtPlugin, useRuntimeConfig, useCookie } from '#app';
import { ofetch } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const locale = useCookie('i18n_locale');

  const apiFetch = ofetch.create({
    async onRequest({ request, options }) {
      // const isServer = process.server;

      // if (isServer) {
      //   // Si es SSR, usamos baseURL sin `/api`
      //   if (typeof request === 'string' && request.startsWith('/api')) {
      //     options.baseURL = config.public.apiBaseUrl;
      //     request = request.replace(/^\/api/, ''); // Quitamos `/api`
      //   }
      // }

      options.credentials = 'include',
      options.headers = {
        ...(options.headers || {}),
        'lang': locale.value
      } as any
    }
  });
  
  const safeApiFetch = async <T>(request: any, options?: any): Promise<T> => {
    try {
      return await apiFetch<T>(request, options);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        
        try {
          await apiFetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });

          return await apiFetch<T>(request, options);
        } catch (refreshErr) {
        }
      }
      throw err;
    }
  }

  nuxtApp.provide('apiFetch', safeApiFetch);
})