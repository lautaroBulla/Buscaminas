type User = {
  username: string,
}

export const useAuth = () => {
  const conf = useRuntimeConfig()
  const user = useState<User | null>('user', () => null)

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
      const data = await $fetch<User>('/api/users/me', {
        method: 'GET',
        credentials: 'include'
      })
      user.value = data
    } catch (err) {
      user.value = null
    }
  }

  return {
    login,
    register
  }
}