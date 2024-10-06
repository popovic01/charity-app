import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC-Ve4RPqz5JJMj46z2AwG3Zrkp3DyV4ys',
  authDomain: 'mpopovic-library.firebaseapp.com',
  projectId: 'mpopovic-library',
  storageBucket: 'mpopovic-library.appspot.com',
  messagingSenderId: '794517531815',
  appId: '1:794517531815:web:0d9d9ba995faca3d48bf82'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
export default db
