<script setup>
  const { currentTheme } = useCurrentTheme();
</script>

<template>
  <div>
    <NavComponent />
    <main class="background" :class="`${currentTheme}`">
      <NuxtPage />
    </main>
  </div>
</template>
