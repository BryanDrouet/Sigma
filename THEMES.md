# Système de Thèmes Dynamiques - Sigma

## 📋 Vue d'ensemble

Le système de thèmes de Sigma est maintenant entièrement dynamique et centralisé dans un fichier JSON. Plus besoin de créer des fichiers CSS individuels pour chaque thème !

## 📁 Fichiers du système

- **`themes.json`** : Configuration de tous les thèmes (couleurs, dates d'activation)
- **`theme-manager.js`** : Moteur du système de thèmes
- **`styles/theme-dynamic.css`** : CSS générique utilisant des variables CSS
- **`settings.json`** : Configuration pour forcer un thème spécifique

## ✨ Ajouter un nouveau thème

### 1. Éditer `themes.json`

Ajoutez simplement une nouvelle entrée dans l'objet `themes` :

```json
{
  "themes": {
    "mon-nouveau-theme": {
      "name": "Mon Nouveau Thème",
      "startDate": "03-15",
      "endDate": "03-20",
      "colors": {
        "bg1": "#couleur1",
        "bg2": "#couleur2",
        "bg3": "#couleur3",
        "main": "#couleurPrincipale",
        "alt": "#couleurAlternative",
        "formBg": "#fondFormulaire",
        "inputBg": "#fondInput",
        "inputBorder": "#bordureInput",
        "btn": "#couleurBouton",
        "btnHover": "#couleurBoutonSurvol",
        "btnDel": "#couleurBoutonSuppr",
        "modal": "rgba(0,0,0,0.4)",
        "hover": "#couleurSurvol",
        "white": "#ffffff",
        "scrollbarTrack": "#fondScrollbar",
        "scrollbarThumb": "#couleurScrollbar",
        "scrollbarThumbHover": "#scrollbarSurvol"
      }
    }
  }
}
```

### 2. Ajouter les images (optionnel)

Créez un dossier dans `assets/events/` avec le même nom que la clé du thème :

```
assets/events/mon-nouveau-theme/
├── 1.png  (image en haut à gauche)
├── 2.png  (image en haut à droite)
└── 3.png  (image en bas)
```

**C'est tout !** Le thème sera automatiquement disponible. 🎉

## 🗓️ Configuration des dates

Les dates utilisent le format `MM-DD` :

- **`startDate`** : Date de début (ex: `"12-01"` pour 1er décembre)
- **`endDate`** : Date de fin (ex: `"12-26"` pour 26 décembre)

### Périodes traversant le nouvel an

Le système gère automatiquement les périodes comme Nouvel An (27 déc → 5 jan) :

```json
{
  "startDate": "12-27",
  "endDate": "01-05"
}
```

## 🎨 Forcer un thème

### Via `settings.json`

Pour forcer l'affichage d'un thème spécifique :

```json
{
  "forcedTheme": "noel"
}
```

Pour revenir au mode automatique (saisonnier) :

```json
{
  "forcedTheme": null
}
```

### Valeurs possibles

Utilisez la **clé** du thème (kebab-case) telle que définie dans `themes.json` :

- `"noel"` → Thème Noël
- `"halloween"` → Thème Halloween
- `"default"` → Thème par défaut Sigma
- `null` → Détection automatique selon la date

## 🎯 Variables CSS disponibles

Toutes les couleurs sont injectées dynamiquement via ces variables CSS :

| Variable | Usage |
|----------|-------|
| `--color-bg1` | Couleur de fond 1 (fallback gradient) |
| `--color-bg2` | Couleur de fond 2 (début gradient) |
| `--color-bg3` | Couleur de fond 3 (fin gradient) |
| `--color-main` | Couleur principale (titres, textes) |
| `--color-alt` | Couleur alternative |
| `--color-form-bg` | Fond des formulaires |
| `--color-input-bg` | Fond des inputs |
| `--color-input-border` | Bordure des inputs |
| `--color-btn` | Couleur des boutons |
| `--color-btn-hover` | Boutons au survol |
| `--color-btn-del` | Bouton de suppression |
| `--color-modal` | Fond des modales |
| `--color-hover` | Couleur de survol |
| `--color-white` | Couleur blanche (contraste) |
| `--scrollbar-track` | Fond de la scrollbar |
| `--scrollbar-thumb` | Barre de défilement |
| `--scrollbar-thumb-hover` | Scrollbar au survol |

## 🔧 API JavaScript

Le système expose une API globale `window.themeSystem` :

```javascript
// Initialiser le système
await window.themeSystem.init();

// Appliquer un thème manuellement
window.themeSystem.apply('noel');

// Obtenir le thème saisonnier actuel
const seasonal = window.themeSystem.getSeasonal();

// Lister tous les thèmes disponibles
const themes = window.themeSystem.getAvailable();

// Accéder à la configuration complète
const config = window.themeSystem.getConfig();

// Vérifier le thème forcé
const forced = await window.themeSystem.getForcedTheme();
```

## 📊 Liste des thèmes actuels

| Clé | Nom | Période |
|-----|-----|---------|
| `default` | Sigma | Toute l'année (par défaut) |
| `noel` | Noël | 1-26 décembre |
| `halloween` | Halloween | 20 oct - 1 nov |
| `nouvel-an` | Nouvel An | 27 déc - 5 jan |
| `paques` | Pâques | 20 mars - 20 avril |
| `fete-musique` | Fête de la Musique | 19-22 juin |
| `zevent` | ZEvent | 6-9 septembre |
| `solstice-ete` | Solstice d'Été | 20-21 juin |
| `solstice-hiver` | Solstice d'Hiver | 20-21 décembre |
| `festival-cannes` | Festival de Cannes | 13-24 mai |
| `popcorn` | Popcorn | 10-16 février |
| `carnaval-cholet` | Carnaval de Cholet | 1-5 mars |
| `nrj-music-awards` | NRJ Music Awards | 8-10 novembre |
| `puy-du-fou` | Puy du Fou | 5 avril - 3 novembre |
| `club-radio-mauleon` | Club Radio Mauléon | 15-18 juillet |
| `sleepless-night` | Sleepless Night | 5-6 octobre |
| `fete-nationale` | Fête Nationale | 14 juillet |
| `les-enfoires` | Les Enfoirés | 20-26 janvier |

## 💡 Avantages du nouveau système

✅ **Un seul fichier JSON** pour tous les thèmes  
✅ **Ajout de thèmes en quelques secondes**  
✅ **Pas de duplication de CSS**  
✅ **Gestion automatique des dates**  
✅ **Scrollbar personnalisée par thème**  
✅ **Images optionnelles**  
✅ **Mode forcé simple**

## 🚀 Migration depuis l'ancien système

Les anciens fichiers CSS dans `styles/events/` ne sont plus utilisés. Tout est maintenant géré via :

1. **`themes.json`** pour les couleurs et dates
2. **`theme-dynamic.css`** pour les styles génériques
3. **`theme-manager.js`** pour la logique

Les thèmes existants ont tous été migrés avec leurs couleurs d'origine ! 🎨
