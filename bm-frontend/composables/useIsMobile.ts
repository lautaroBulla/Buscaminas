export const useIsMobile = () => {
  const isMobile = useState('isMobile', () => {
    if (process.client) {
      return window.matchMedia('(max-width: 640px)').matches;
    }
    return false; // en SSR, asumimos desktop
  });

  const updateIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 640px)').matches;
  };

  onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIsMobile);
  });

  return { isMobile };
};
