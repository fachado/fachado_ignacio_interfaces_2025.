import { Theme } from './theme.model';

export const PROFESSIONAL: Theme = {
  id: 'professional',
  name: 'Profesional',
  palette: {
    primary: '#0b132b',
    secondary: '#00a8e8',
    background: '#0f1724',
    surface: '#0b1220',
    text: '#e6eef6'
  },
  fontFamily: "'Inter', sans-serif",
  fontSizeBase: '16px',
  button: { borderRadius: '8px', padding: '10px 16px', position: 'right', image: 'assets/themes/professional/btn.png' },
  headerImage: 'assets/themes/professional/header.png',
  backgroundImage: 'assets/themes/professional/bg.png',
  iconSet: 'professional',
  sounds: { click: 'assets/sounds/prof_click.mp3' },
  darkMode: true
};

export const ARGENTINA: Theme = {
  id: 'argentina',
  name: 'Argentina',
  palette: {
    primary: '#75c6ff',
    secondary: '#ffffff',
    background: '#f6fbff',
    surface: '#ffffff',
    text: '#0a2b4a'
  },
  fontFamily: "'Montserrat', sans-serif",
  fontSizeBase: '16px',
  button: { borderRadius: '4px', padding: '10px 14px', position: 'center', image: 'assets/themes/argentina/btn.png' },
  headerImage: 'assets/themes/argentina/header.png',
  backgroundImage: 'assets/themes/argentina/bg.png',
  iconSet: 'outline',
  sounds: { click: 'assets/sounds/arg_click.mp3' },
  darkMode: false
};

export const NAIF: Theme = {
  id: 'naif',
  name: 'Naif',
  palette: {
    primary: '#ffb3c1',
    secondary: '#ffd9a5',
    background: '#fff7f2',
    surface: '#fff0ee',
    text: '#4d3737'
  },
  fontFamily: "'Comic Neue', cursive",
  fontSizeBase: '18px',
  button: { borderRadius: '20px', padding: '12px 20px', position: 'center', image: 'assets/themes/naif/btn.png' },
  headerImage: 'assets/themes/naif/header.png',
  backgroundImage: 'assets/themes/naif/bg.png',
  iconSet: 'rounded',
  sounds: { click: 'assets/sounds/naif_click.mp3' },
  darkMode: false
};
