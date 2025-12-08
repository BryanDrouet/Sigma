// Configuration Firebase pour Sigma
const firebaseConfig = {
  apiKey: "AIzaSyC-5kALEYOgIwiDAHfgwFscELm4cvKRV1c",
  authDomain: "sigma-ea4fe.firebaseapp.com",
  projectId: "sigma-ea4fe",
  storageBucket: "sigma-ea4fe.firebasestorage.app",
  messagingSenderId: "525542135476",
  appId: "1:525542135476:web:f574242e2767c83c72a9e1"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Initialiser Firestore
const db = firebase.firestore();

// Initialiser Auth
const auth = firebase.auth();

// Provider Google
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Fonctions utilitaires pour remplacer localStorage

// Sauvegarder les données d'un compte
async function saveAccountData(accountId, data) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    await db.collection('users').doc(user.uid).collection('accounts').doc(accountId).set(data, { merge: true });
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    return false;
  }
}

// Récupérer les données d'un compte
async function getAccountData(accountId) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    const doc = await db.collection('users').doc(user.uid).collection('accounts').doc(accountId).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return null;
  }
}

// Récupérer tous les comptes de l'utilisateur
async function getAllAccounts() {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    const snapshot = await db.collection('users').doc(user.uid).collection('accounts').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes:", error);
    return [];
  }
}

// Supprimer un compte
async function deleteAccountData(accountId) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    await db.collection('users').doc(user.uid).collection('accounts').doc(accountId).delete();
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return false;
  }
}

// Sauvegarder les matières
async function saveSubjects(accountId, subjects) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    await db.collection('users').doc(user.uid).collection('accounts').doc(accountId)
      .collection('subjects').doc('data').set({ subjects });
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des matières:", error);
    return false;
  }
}

// Récupérer les matières
async function getSubjects(accountId) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    const doc = await db.collection('users').doc(user.uid).collection('accounts').doc(accountId)
      .collection('subjects').doc('data').get();
    return doc.exists ? doc.data().subjects : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des matières:", error);
    return [];
  }
}

// Sauvegarder les notes
async function saveNotes(accountId, notes) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    await db.collection('users').doc(user.uid).collection('accounts').doc(accountId)
      .collection('notes').doc('data').set({ notes });
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des notes:", error);
    return false;
  }
}

// Récupérer les notes
async function getNotes(accountId) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté");
    
    const doc = await db.collection('users').doc(user.uid).collection('accounts').doc(accountId)
      .collection('notes').doc('data').get();
    return doc.exists ? doc.data().notes : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des notes:", error);
    return [];
  }
}

// Authentification utilisateur par email
async function signInUser(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    throw error;
  }
}

// Inscription utilisateur par email
async function signUpUser(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    throw error;
  }
}

// Connexion avec Google
async function signInWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    return result.user;
  } catch (error) {
    console.error("Erreur de connexion Google:", error);
    throw error;
  }
}

// Déconnexion
async function signOutUser() {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    return false;
  }
}

// Observer l'état d'authentification
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}
