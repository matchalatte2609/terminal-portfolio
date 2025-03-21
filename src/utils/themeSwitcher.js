// utils/themeSwitcher.js

// Theme configurations
const themes = {
  dark: {
    name: 'dark',
    bgColor: '#1e1e1e',
    terminalBg: '#0c0c0c',
    textColor: '#f0f0f0',
    promptColor: '#00ff00',
    accentColor: '#007acc',
    errorColor: '#ff3333',
    headerColor: '#333333',
    borderColor: '#444444',
  },
  light: {
    name: 'light',
    bgColor: '#f0f0f0',
    terminalBg: '#ffffff',
    textColor: '#333333',
    promptColor: '#0066cc',
    accentColor: '#0099ff',
    errorColor: '#cc0000',
    headerColor: '#dddddd',
    borderColor: '#cccccc',
  },
  retro: {
    name: 'retro',
    bgColor: '#000000',
    terminalBg: '#000000',
    textColor: '#33ff33',
    promptColor: '#33ff33',
    accentColor: '#33ff33',
    errorColor: '#ff5555',
    headerColor: '#111111',
    borderColor: '#33ff33',
  },
  matrix: {
    name: 'matrix',
    bgColor: '#0d0208',
    terminalBg: '#000000',
    textColor: '#00ff00',
    promptColor: '#00ff41',
    accentColor: '#008f11',
    errorColor: '#ff0000',
    headerColor: '#003b00',
    borderColor: '#003b00',
  },
};

// Apply theme to document
const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes.dark;
  
  // Apply theme to CSS variables
  document.documentElement.style.setProperty('--bg-color', theme.bgColor);
  document.documentElement.style.setProperty('--terminal-bg', theme.terminalBg);
  document.documentElement.style.setProperty('--text-color', theme.textColor);
  document.documentElement.style.setProperty('--prompt-color', theme.promptColor);
  document.documentElement.style.setProperty('--accent-color', theme.accentColor);
  document.documentElement.style.setProperty('--error-color', theme.errorColor);
  document.documentElement.style.setProperty('--header-color', theme.headerColor);
  document.documentElement.style.setProperty('--border-color', theme.borderColor);
  
  // Store current theme in localStorage
  localStorage.setItem('terminal-theme', themeName);
  
  return themeName;
};

// Toggle between themes
const toggleTheme = () => {
  const currentTheme = localStorage.getItem('terminal-theme') || 'dark';
  const themeNames = Object.keys(themes);
  const currentIndex = themeNames.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themeNames.length;
  const nextTheme = themeNames[nextIndex];
  
  return applyTheme(nextTheme);
};

// Initialize theme from localStorage or default to dark
const initTheme = () => {
  const savedTheme = localStorage.getItem('terminal-theme');
  return applyTheme(savedTheme || 'dark');
};

export default {
  themes,
  applyTheme,
  toggleTheme,
  initTheme,
};