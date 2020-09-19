import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDeZaKg_CZdORT-fHq0UvhjgZxxEpWEHq8',
  authDomain: 'react-slack-clone-70b29.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-70b29.firebaseio.com',
  projectId: 'react-slack-clone-70b29',
  storageBucket: 'react-slack-clone-70b29.appspot.com',
  messagingSenderId: '128582314596',
  appId: '1:128582314596:web:573792f1c99cdfd1c3cd71',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  auth.signOut();
};
// Firestore stuff
export const firestore = firebase.firestore();
window.firestore = firestore;

export const createOrGetUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // check if a the user doc is there in DB with
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  // if no user exists in DB @ path 'userRef' then go and make one
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    const createdAt = new Date();

    try {
      await userRef.set({
        display_name: displayName || additionalData.displayName,
        email,
        photo_url: photoURL
          ? photoURL
          : 'https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72',
        created_at: createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid);
    return userDocument;
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};
