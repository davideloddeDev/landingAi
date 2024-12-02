import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const getSubscriptionStatus = async (userId) => {
  const subscriptionDoc = await getDoc(doc(db, 'subscriptions', userId));
  return subscriptionDoc.data();
};

export const updateSubscription = async (userId, newPlan) => {
  await updateDoc(doc(db, 'subscriptions', userId), {
    plan: newPlan,
    updatedAt: new Date().toISOString()
  });
};
