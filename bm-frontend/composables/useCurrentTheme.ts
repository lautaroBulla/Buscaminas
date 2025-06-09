export const useCurrentTheme = () => {
  const currentTheme = useState('currentTheme', () => 'darkTheme');
  return { currentTheme };
}