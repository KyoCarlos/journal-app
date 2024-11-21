// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyADC1yYWybW-6NG9KAAnzor5-FgjK8NVsY',
	authDomain: 'react-cursos-b451f.firebaseapp.com',
	projectId: 'react-cursos-b451f',
	storageBucket: 'react-cursos-b451f.firebasestorage.app',
	messagingSenderId: '799340132964',
	appId: '1:799340132964:web:722eb01095f2930acd7d71',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
