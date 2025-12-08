// Gestion dynamique des thèmes
let themesConfig = null;

// Charger la configuration des thèmes
async function loadThemesConfig() {
  try {
    const response = await fetch('themes.json');
    themesConfig = await response.json();
    return themesConfig;
  } catch (error) {
    console.error('Erreur lors du chargement des thèmes:', error);
    return null;
  }
}

// Appliquer un thème en injectant les variables CSS
function applyTheme(themeKey) {
  if (!themesConfig || !themesConfig.themes[themeKey]) {
    console.error('Thème non trouvé:', themeKey);
    return;
  }

  const theme = themesConfig.themes[themeKey];
  const colors = theme.colors;
  const root = document.documentElement;

  // Injecter les variables CSS
  root.style.setProperty('--color-bg1', colors.bg1);
  root.style.setProperty('--color-bg2', colors.bg2);
  root.style.setProperty('--color-bg3', colors.bg3);
  root.style.setProperty('--color-main', colors.main);
  root.style.setProperty('--color-alt', colors.alt);
  root.style.setProperty('--color-form-bg', colors.formBg);
  root.style.setProperty('--color-input-bg', colors.inputBg);
  root.style.setProperty('--color-input-border', colors.inputBorder);
  root.style.setProperty('--color-btn', colors.btn);
  root.style.setProperty('--color-btn-hover', colors.btnHover);
  root.style.setProperty('--color-btn-del', colors.btnDel);
  root.style.setProperty('--color-modal', colors.modal);
  root.style.setProperty('--color-hover', colors.hover);
  root.style.setProperty('--color-white', colors.white);
  root.style.setProperty('--scrollbar-track', colors.scrollbarTrack);
  root.style.setProperty('--scrollbar-thumb', colors.scrollbarThumb);
  root.style.setProperty('--scrollbar-thumb-hover', colors.scrollbarThumbHover);

  console.log('Thème appliqué:', theme.name);
}

// Obtenir le thème saisonnier actuel
function getSeasonalTheme() {
  if (!themesConfig) return 'default';

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${month}-${day}`;

  // Parcourir tous les thèmes pour trouver celui qui correspond à la date
  for (const [key, theme] of Object.entries(themesConfig.themes)) {
    if (key === 'default') continue;
    
    if (theme.startDate && theme.endDate) {
      const start = theme.startDate;
      const end = theme.endDate;
      
      // Gérer les périodes qui traversent le changement d'année (ex: 12-27 à 01-05)
      if (start > end) {
        if (currentDate >= start || currentDate <= end) {
          return key;
        }
      } else {
        if (currentDate >= start && currentDate <= end) {
          return key;
        }
      }
    }
  }

  return 'default';
}

// Obtenir le thème forcé depuis settings.json
async function getForcedTheme() {
  try {
    const response = await fetch('settings.json');
    const settings = await response.json();
    return settings.forcedTheme || null;
  } catch (error) {
    console.log('Pas de thème forcé');
    return null;
  }
}

// Initialiser le système de thèmes
async function initThemeSystem() {
  await loadThemesConfig();
  
  if (!themesConfig) {
    console.error('Impossible de charger les thèmes');
    return;
  }

  // Vérifier si un thème est forcé
  const forcedTheme = await getForcedTheme();
  let selectedTheme = forcedTheme || getSeasonalTheme();

  // Appliquer le thème
  applyTheme(selectedTheme);

  // Rendre la page visible après application du thème
  document.documentElement.style.visibility = 'visible';
  
  return selectedTheme;
}

// Fonction pour obtenir la liste de tous les thèmes disponibles
function getAvailableThemes() {
  if (!themesConfig) return [];
  return Object.entries(themesConfig.themes).map(([key, theme]) => ({
    key,
    name: theme.name,
    startDate: theme.startDate,
    endDate: theme.endDate
  }));
}

// Exporter les fonctions pour utilisation externe
window.themeSystem = {
  init: initThemeSystem,
  apply: applyTheme,
  getSeasonal: getSeasonalTheme,
  getAvailable: getAvailableThemes,
  getConfig: () => themesConfig,
  getForcedTheme: getForcedTheme
};
