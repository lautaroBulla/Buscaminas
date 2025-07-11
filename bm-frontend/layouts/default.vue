<script setup>
  const { currentTheme } = useCurrentTheme();
</script>

<template>
  <div class="layout-container">
    <NavComponent />
    <main class="main-content background" :class="`${currentTheme}`">
      <NuxtPage />
    </main>
  </div>
</template>