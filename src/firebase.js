import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCPmByBk5upInznh4sIT8dWKrQ9h3QmeVg",
  authDomain: "coinkitty-7845f.firebaseapp.com",
  projectId: "coinkitty-7845f",
  storageBucket: "coinkitty-7845f.firebasestorage.app",
  messagingSenderId: "951184186435",
  appId: "1:951184186435:web:89254dda03e30070c848f6"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)