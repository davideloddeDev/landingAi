import { db } from '../config/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { PLAN_PRICES } from './plans';
import { updateSubscriptionStatus } from './plans';

export const initializePayment = async (userId, plan) => {
  const amount = PLAN_PRICES[plan];
  
  const paymentData = {
    userId,
    plan,
    amount,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const paymentRef = await addDoc(collection(db, 'payments'), paymentData);
  return { 
    paymentId: paymentRef.id,
    checkoutUrl: `/checkout/${paymentRef.id}`
  };
};

export const simulatePayment = async (paymentId, userId, plan) => {
  try {
    // Simula una transazione di successo
    await updateDoc(doc(db, 'payments', paymentId), {
      status: 'completed',
      completedAt: new Date().toISOString(),
      transactionId: `MOCK_${Date.now()}`
    });

    // Attiva l'abbonamento
    await updateSubscriptionStatus(userId, 'active');

    return { success: true };
  } catch (error) {
    throw new Error('Errore durante il pagamento simulato');
  }
};
