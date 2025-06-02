/*
los plugins .client se ejecutan del lado del cliente
este se encarga una vez que la aplicacion esta lista
hace getProfile de useAuth para obtener el perfil del usuario
*/

export default defineNuxtPlugin(async () => {
  onNuxtReady(async () => {
    const { getProfile } = useAuth();
    await getProfile();
  })
})
