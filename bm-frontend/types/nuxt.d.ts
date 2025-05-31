declare module '#app' {
  interface NuxtApp {
    $customFetch: typeof $fetch
  }
}

export {}
