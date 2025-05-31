export default defineNuxtPlugin((nuxtApp) => {
  const locale = useState('locale', () => 'en');

  const customFetch = $fetch.create({
    credentials: 'include',
    onRequest({ options }) {
      options.headers = {
        ...(options.headers || {}),
        'language': locale.value
      } as any
    } 
  });

  nuxtApp.provide('customFetch', customFetch);
})
