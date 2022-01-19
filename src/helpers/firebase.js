import { initializeApp  } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3Nv0THIr8GC_lsgzn9zLHM4XUBV1XcTw",
    authDomain: "dmnbot-2b8f9.firebaseapp.com",
    projectId: "dmnbot-2b8f9",
    databaseURL: "https://dmnbot-2b8f9-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "dmnbot-2b8f9.appspot.com",
    messagingSenderId: "963209271281",
    appId: "1:963209271281:web:515844222e624838851650"
    };
const app = initializeApp(firebaseConfig);
export default app;