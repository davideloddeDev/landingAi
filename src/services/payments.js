import { db } from '../config/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { PLAN_PRICES } from './plans';

export const createPayment = async (userId, plan) => {
  const amount = PLAN_PRICES[plan];
  
  const paymentData = {
    userId,
    plan,
    amount,
    status: 'pending',
    createdAt: new Date().toISOString(),
    paymentMethod: null,
    transactionId: null
  };

  const paymentRef = await addDoc(collection(db, 'payments'), paymentData);
  return { id: paymentRef.id, ...paymentData };
};

export const processPayment = async (paymentId, paymentMethod) => {
  try {
    // Qui integreremo il provider di pagamenti (es. Stripe)
    const paymentResult = {
      success: true,
      transactionId: `tx_${Date.now()}`
    };

    if (paymentResult.success) {
      await updateDoc(doc(db, 'payments', paymentId), {
        status: 'completed',
        paymentMethod,
        transactionId: paymentResult.transactionId,
        completedAt: new Date().toISOString()
      });
    }

    return paymentResult;
  } catch (error) {
    await updateDoc(doc(db, 'payments', paymentId), {
      status: 'failed',
      error: error.message
    });
    throw error;
  }
};
