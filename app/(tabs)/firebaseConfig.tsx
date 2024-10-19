// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkcK2BdLytBB1YlhS7FB5Y6rOXbK-0Xqk",
  authDomain: "tarefa-facil-00.firebaseapp.com",
  projectId: "tarefa-facil-00",
  storageBucket: "tarefa-facil-00.appspot.com",
  messagingSenderId: "303747806577",
  appId: "1:303747806577:web:256360c526451e0f2c32d0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }; // Certifique-se de exportar o app e o auth
