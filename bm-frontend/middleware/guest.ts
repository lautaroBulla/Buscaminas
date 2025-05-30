/*
Middleware simplemente que se encarga de verificar si hay un usuario authenticado
asi evitar el acceso a paginas
*/

export default defineNuxtRouteMiddleware (() => {
  const user = useState('user');
  const isAuthReady = useState('isAuthReady');

  if (!isAuthReady) return;

  if (user.value !== null) {
    return navigateTo('/');
  }
});