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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log(collectionRef)

  const batch = firestore.batch()

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc() // new document refecernce in firebase
    batch.set(newDocRef, obj)
  });

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumlator, collection) => {
    accumlator[collection.title.toLowerCase()] = collection;

    return accumlator
  }, {})
  console.log("Collection Data : ", transformedCollection)
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;
