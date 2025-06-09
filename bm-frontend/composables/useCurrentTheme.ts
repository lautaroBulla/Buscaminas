export const useCurrentTheme = () => {
  const currentTheme = useState('currentTheme', () => 'dark');
  return { currentTheme };
}