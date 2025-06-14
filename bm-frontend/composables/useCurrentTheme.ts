export const useCurrentTheme = () => {
  const currentTheme = useCookie('currentTheme', {
    default: () => "classicTheme",
    path: "/"
  });
  return { currentTheme };
}