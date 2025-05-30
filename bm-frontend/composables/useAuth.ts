export const useAuth = () => {
  const conf = useRuntimeConfig()
  const user = useState('user')

  const login = async (username: string, password: string) => {
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: {username, password},
        credentials: 'include'
      })
      await getProfile()
    } catch (error) {
      throw error
    }
  }

  const register = async (username: string, password: string) => {
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: {username, password},
        credentials: 'include'
      })
      await getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const getProfile = async () => {
    try {
      const data = await $fetch('/api/users/me', {
        method: 'GET',
        credentials: 'include'
      })
      user.value = data
      console.log(user.value);
    } catch (err) {
      user.value = null
    }
  }

  return {
    login,
    register
  }
}