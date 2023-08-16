import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAg2n8QFKttyo8esYje_oSGyUSrQa3nt4I',
  authDomain: 'imagens-merenda-ifms.firebaseapp.com',
  projectId: 'imagens-merenda-ifms',
  storageBucket: 'imagens-merenda-ifms.appspot.com',
  messagingSenderId: '600466379702',
  appId: '1:600466379702:web:77660f25c45cdf8e746717',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
