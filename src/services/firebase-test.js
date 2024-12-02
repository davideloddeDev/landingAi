import { auth, db, storage } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref } from 'firebase/storage';

const testFirebaseConnection = async () => {
  try {
    // Test Auth
    const authCurrentUser = auth.currentUser;
    console.log('Auth inizializzato:', !!auth);

    // Test Firestore
    const testCollection = collection(db, 'test');
    const dbTest = await getDocs(testCollection);
    console.log('Firestore connesso:', !!dbTest);

    // Test Storage
    const storageReference = ref(storage, 'test');
    console.log('Storage inizializzato:', !!storageReference);

    return true;
  } catch (error) {
    console.error('Errore connessione Firebase:', error);
    return false;
  }
};

export default testFirebaseConnection;