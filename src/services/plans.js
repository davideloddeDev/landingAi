import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const LAUNCH_OFFER = true; // Flag per l'offerta di lancio

export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
  BUSINESS: 'business'
};

// Prezzi durante l'offerta di lancio
export const PLAN_PRICES = {
  [PLANS.FREE]: 0,
  [PLANS.PRO]: 0,  // Normalmente 29
  [PLANS.BUSINESS]: 0  // Normalmente 99
};

export const PLAN_FEATURES = {
  [PLANS.FREE]: {
    pages: 1,
    support: 'email',
    export: 'HTML/CSS'
  },
  [PLANS.PRO]: {
    pages: 5,
    support: 'prioritario',
    export: 'HTML/CSS/JS',
    seo: true
  },
  [PLANS.BUSINESS]: {
    pages: 10,
    support: '24/7',
    export: 'completo',
    seo: true,
    analytics: true
  }
};

export const createUserSubscription = async (userId, plan) => {
  const subscriptionData = {
    plan,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: PLAN_FEATURES[plan],
    isLaunchOffer: true,
    launchOfferActivatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'subscriptions', userId), subscriptionData);
  return subscriptionData;
};
export const getUserSubscription = async (userId) => {
  const docRef = doc(db, 'subscriptions', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateSubscriptionStatus = async (userId, status) => {
  await setDoc(doc(db, 'subscriptions', userId), {
    status,
    updatedAt: new Date().toISOString()
  }, { merge: true });
};
