/*
Middleware simplemente que se encarga de verificar si hay un usuario authenticado
asi evitar el acceso a paginas
*/

export default defineNuxtRouteMiddleware (() => {
  const { user } = useAuth();
  console.log('Middleware guest');
  console.log(user);
  console.log('Middleware guest');
  if (user && user.value) {
    return navigateTo('/');
  }
});