type User = {
  username: string
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useState<User | null>('user', () => null);

  if (user.value === null) {
    try {
      const data = await $fetch<User>('/api/users/me', {
        method: 'GET',
        credentials: 'include'
      })
      user.value = data
      console.log('User loaded from /users/me', user.value)
    } catch (err) {
      user.value = null
      console.log('User not authenticated')
    }
  }
})
