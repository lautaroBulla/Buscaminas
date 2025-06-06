export const useCurrentTheme = () => {
  const currentTheme = useState('currentTheme', () => 'classic');
  return { currentTheme };
}