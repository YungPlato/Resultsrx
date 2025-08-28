// Ensure this file is only used on the client. Avoids running during SSR/prerender.
// We export async getters so initialization is lazy and safe in client components/effects.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let cachedAuth: Auth | null = null;
let cachedDb: Firestore | null = null;
let cachedStorage: FirebaseStorage | null = null;

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  } as const;
}

function ensureClientApp() {
  const config = getFirebaseConfig();
  const hasAllKeys = Object.values(config).every(Boolean);
  if (!hasAllKeys) {
    throw new Error('Firebase config is missing. Set NEXT_PUBLIC_FIREBASE_* env vars.');
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
