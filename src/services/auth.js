import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  deleteUser 
} from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { createUserSubscription } from './plans';

export const registerUser = async (email, password, plan = 'free') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await createUserSubscription(user.uid, plan);
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const user = auth.currentUser;
    
    // Elimina i dati dell'utente da Firestore
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteDoc(doc(db, 'subscriptions', user.uid));
    
    // Elimina l'account Firebase
    await deleteUser(user);
    
    return true;
  } catch (error) {
    throw error;
  }
};