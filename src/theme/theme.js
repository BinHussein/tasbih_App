export const themes = {
  light: {
    background: '#F6FBF5',
    surface: '#FFFFFF',
    primary: '#2E7D32',
    secondary: '#66BB6A',
    text: '#1B3A1A',
    subtleText: '#5A6C5A',
    border: '#DDE8DA'
  },
  dark: {
    background: '#0F1B12',
    surface: '#1A2A1E',
    primary: '#81C784',
    secondary: '#66BB6A',
    text: '#E6F5E4',
    subtleText: '#A9C4A6',
    border: '#2C4632'
  }
};

export const resolveTheme = (preference, systemScheme) => {
  const activeScheme =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  return {
    scheme: activeScheme,
    colors: themes[activeScheme]
  };
};