/*
plugins.client son funcionalidades que se ejecutan una vez al inicio de la aplicación, del lado del cliente.

Este plugin sirve para llamar la funcion getProfile de useAuth 
que obtiene al informacion del usuario autenticado
y la guarda en un estado global.
*/

export default defineNuxtPlugin(async () => {
  const { getProfile } = useAuth()
  await getProfile()
})
