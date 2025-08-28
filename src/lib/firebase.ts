// Ensure this file is only used on the client. Avoids running during SSR/prerender.
// We export async getters so initialization is lazy and safe in client components/effects.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, Analytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let cachedAuth: Auth | null = null;
let cachedDb: Firestore | null = null;
let cachedStorage: FirebaseStorage | null = null;
let cachedAnalytics: Analytics | null = null;

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  } as const;
}

function ensureClientApp() {
  const config = getFirebaseConfig();
  const requiredKeys = [
    config.apiKey,
    config.authDomain,
    config.projectId,
    config.appId,
  ];
  const hasRequired = requiredKeys.every(Boolean);
  if (!hasRequired) {
    throw new Error('Firebase config is missing required values. Set NEXT_PUBLIC_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, APP_ID.');
  }
  const app = getApps().length ? getApp() : initializeApp(config);
  return app;
}

export function getClientAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('getClientAuth must be called on the client');
  }
  if (!cachedAuth) {
    const app = ensureClientApp();
    cachedAuth = getAuth(app);
  }
  return cachedAuth;
}

export function getClientDb(): Firestore {
  if (typeof window === 'undefined') {
    throw new Error('getClientDb must be called on the client');
  }
  if (!cachedDb) {
    const app = ensureClientApp();
    cachedDb = getFirestore(app);
  }
  return cachedDb;
}

export function getClientStorage(): FirebaseStorage {
  if (typeof window === 'undefined') {
    throw new Error('getClientStorage must be called on the client');
  }
  if (!cachedStorage) {
    const app = ensureClientApp();
    cachedStorage = getStorage(app);
  }
  return cachedStorage;
}

export async function getClientAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    throw new Error('getClientAnalytics must be called on the client');
  }
  if (cachedAnalytics) return cachedAnalytics;
  const supported = await isAnalyticsSupported();
  if (!supported) return null;
  const app = ensureClientApp();
  cachedAnalytics = getAnalytics(app);
  return cachedAnalytics;
}
