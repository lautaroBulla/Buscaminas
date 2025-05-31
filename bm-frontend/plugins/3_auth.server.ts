/*
plugins.server son funcionalidades que se ejecutan una vez al inicio de la aplicación, del lado del server.

Este plugin sirve para obtener los datos del usuario autenticado en el servidor,
y almacenarlos en un estado global para que estén disponibles en toda la aplicación.

Primero se detecta si el evento es del lado del servidor (SSR),
luego se accede a las cookies y se hace la petición al backend para obtener el usuario autenticado.
*/
import { parseCookies } from 'h3'

export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useState('user')
  const isAuthReady = useState('isAuthReady')

  try {
    const event = nuxtApp.ssrContext?.event

    if (event) {
      const runtimeConfig = useRuntimeConfig()
      const backendBaseUrl = runtimeConfig.public.apiBaseUrl 

      const cookies = parseCookies(event)
      const token = cookies.Authentication

      if (token) {
        const data = await $fetch(`${backendBaseUrl}/users/me`, {
          method: 'GET',
          headers: {
            cookie: `Authentication=${token}`
          }
        })
        user.value = data
      } else {
        user.value = null
      }
    } 
  } catch (err) {
    user.value = null
  } finally {
    isAuthReady.value = true
  };
});
