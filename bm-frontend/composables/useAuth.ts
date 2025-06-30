/*
Este composable se encarga de la logica de authenticacion del lado del front

se definen las variables globales de user y isAuthReady
user guardara la infromacion del usuario
mientras que isAuthReady se garantiza que el proceso de auth ya esta finalizado
importante para mostrar luego la informacion en los componentes
*/

type User = {
  username: string
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null);
  const isAuthReady = useState<boolean>('isAuthReady', () => false);

  const { $apiFetch } = useNuxtApp();
  
  const getProfile = async () => {
    try {
      const data = await $apiFetch<User>('/api/users/me', {
        method: 'GET'
      });
      user.value = data;
    } catch (error) {
      user.value = null;
    } finally {
      isAuthReady.value = true;
    }
  }

  const login = async (username: string, password: string) => {
    try {
      await $apiFetch('/api/auth/login', {
        method: 'POST',
        body: {username, password}
      })
      await getProfile();
    } catch (error) {
      throw error;
    }
  }

  const register = async (username: string, password: string) => {
    try {
      await $apiFetch('/api/auth/register', {
        method: 'POST',
        body: {username, password}
      })
      await getProfile();
    } catch (error) {
      throw error;
    }
  }

  const logout = async () => {
    try {
      await $apiFetch('/api/auth/logout', {
        method: 'POST'
      })   
      user.value = null;
      navigateTo('/');
    } catch (error) {
      throw error;
    }
  }

  return {
    user,
    isAuthReady,
    getProfile,
    login,
    register,
    logout
  }
}