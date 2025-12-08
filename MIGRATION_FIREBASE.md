# Migration vers Firebase - Guide de Configuration

## 📋 Changements effectués

Votre application Sigma a été complètement transformée :

### ✅ Ce qui a changé

1. **Stockage unifié avec Firebase**
   - Toutes les données sont maintenant stockées dans Firebase Firestore
   - Fini le stockage local (localStorage) - vos données sont synchronisées dans le cloud
   - Accédez à vos notes depuis n'importe quel appareil

2. **Authentification Firebase**
   - Système de connexion/inscription avec email et mot de passe
   - Chaque utilisateur a ses propres données sécurisées
   - Gestion de session sécurisée

3. **Dashboard unifié**
   - Plus de séparation entre EcoleDirecte et Pronote
   - Un seul dashboard "Sigma" qui combine toutes les fonctionnalités
   - Interface modernisée avec design violet unifié

4. **Fichiers créés/modifiés**
   - ✨ **Nouveau** : `firebase-config.js` - Configuration Firebase
   - ✨ **Nouveau** : `dashboard.html` - Dashboard unifié Sigma
   - ✨ **Nouveau** : `styles/styleDashboard.css` - Styles unifiés
   - 🔄 **Modifié** : `index.html` - Page de connexion/inscription
   - 🔄 **Modifié** : `styles/styleHome.css` - Styles de la page d'accueil

## 🔧 Configuration requise

### Étape 1 : Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Donnez un nom à votre projet (ex: "Sigma")
4. Suivez les étapes de configuration

### Étape 2 : Activer Authentication

1. Dans votre projet Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Activez "Email/Password" comme méthode de connexion

### Étape 3 : Activer Firestore

1. Allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez le mode "production" ou "test" selon vos besoins
4. Sélectionnez une région proche de vos utilisateurs

### Étape 4 : Configurer les règles Firestore

Dans "Firestore Database" > "Règles", utilisez ces règles :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /accounts/{accountId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
        
        match /subjects/{document=**} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        
        match /notes/{document=**} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
  }
}
```

### Étape 5 : Obtenir vos clés Firebase

1. Dans les paramètres du projet (⚙️), allez dans "Paramètres du projet"
2. Faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône Web (</>)
4. Enregistrez votre application (ex: "Sigma Web")
5. Copiez les informations de configuration

### Étape 6 : Mettre à jour firebase-config.js

Ouvrez le fichier `firebase-config.js` et remplacez les valeurs de configuration :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",                    // Remplacez par votre clé
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};
```

## 🚀 Utilisation

### Première connexion

1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur "S'inscrire"
3. Créez un compte avec votre email et mot de passe
4. Une fois connecté, créez votre premier compte scolaire (nom, trimestre/semestre, année)
5. Vous serez redirigé vers le dashboard unifié Sigma

### Fonctionnalités

- ✅ Connexion/Inscription sécurisée
- ✅ Gestion de plusieurs comptes scolaires
- ✅ Ajout, modification, suppression de matières
- ✅ Ajout, modification, suppression de notes
- ✅ Calcul automatique sur 20
- ✅ Gestion des coefficients
- ✅ Organisation par trimestre/semestre
- ✅ Synchronisation cloud automatique
- ✅ Thèmes saisonniers

## 📊 Structure des données Firebase

```
users/
  └── {userId}/
      └── accounts/
          └── {accountId}/
              ├── name: "Mon compte"
              ├── period: "trimestriel"
              ├── schoolYear: "2024-2025"
              ├── subjects/
              │   └── data/
              │       └── subjects: ["Mathématiques", "Français", ...]
              └── notes/
                  └── data/
                      └── notes: [{subject, mark, maxMark, coefficient, ...}, ...]
```

## 🔐 Sécurité

- ✅ Authentification requise pour accéder aux données
- ✅ Chaque utilisateur ne peut voir que ses propres données
- ✅ Règles Firestore strictes
- ✅ Mot de passe hashé par Firebase Auth

## 🎨 Personnalisation

### Changer les couleurs du thème

Éditez `styles/styleDashboard.css` :

```css
/* Modifier le gradient de fond */
html {
  background: linear-gradient(150deg, #6a5acd 0%, #483d8b 100%);
}

/* Modifier la couleur des boutons */
button[type="submit"], button[type="button"], .btn {
  background-color: #6a5acd; /* Votre couleur */
}
```

## ❓ Dépannage

### "Erreur de connexion"
- Vérifiez que vous avez activé Authentication dans Firebase
- Vérifiez que la méthode Email/Password est activée

### "Impossible de sauvegarder"
- Vérifiez que Firestore est activé
- Vérifiez que les règles Firestore sont configurées correctement

### "Configuration Firebase invalide"
- Vérifiez que vous avez bien copié toutes les clés dans `firebase-config.js`
- Assurez-vous qu'il n'y a pas de fautes de frappe

## 📝 Migration des données existantes

Si vous aviez des données dans l'ancien système (localStorage), elles ne seront pas automatiquement migrées. Vous devrez :

1. Créer un nouveau compte utilisateur
2. Recréer vos comptes scolaires
3. Ressaisir vos notes

**Note** : Les anciens fichiers `dashboardED.html` et `dashboardPN.html` sont toujours présents mais ne sont plus utilisés. Vous pouvez les supprimer si vous le souhaitez.

## 🎯 Prochaines étapes recommandées

1. Testez la connexion et l'inscription
2. Créez un compte de test
3. Ajoutez quelques matières et notes
4. Vérifiez que tout fonctionne correctement
5. Une fois satisfait, vous pouvez supprimer les anciens fichiers dashboard

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
- La console du navigateur (F12) pour les erreurs
- La console Firebase pour les logs
- Les règles Firestore sont correctement configurées

---

**Bon usage de Sigma ! 🚀**
