/*
Middleware simplemente que se encarga de verificar si hay un usuario authenticado
asi evitar el acceso a paginas
*/

export default defineNuxtRouteMiddleware (() => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady.value) return;

  if (user.value !== null) {
    return navigateTo('/');
  }
});