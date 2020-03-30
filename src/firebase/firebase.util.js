import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBZD0JdABLKUko7tL24G12N2lehYQYnoNc",
  authDomain: "crown-db-d7d50.firebaseapp.com",
  databaseURL: "https://crown-db-d7d50.firebaseio.com",
  projectId: "crown-db-d7d50",
  storageBucket: "crown-db-d7d50.appspot.com",
  messagingSenderId: "716356175602",
  appId: "1:716356175602:web:52af6054ab358ed895326b",
  measurementId: "G-M4CE61GN8Z"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth)  return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message )
    }
  }

  return userRef
  console.log(snapshot)

  console.log(firestore.doc('users/12321dsasa'))
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
