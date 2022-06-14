// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOMd8R0tVzudnNbwTaf1xj06FFcq69zLU",
  authDomain: "dation-645f2.firebaseapp.com",
  databaseURL: "https://dation-645f2-default-rtdb.firebaseio.com",
  projectId: "dation-645f2",
  storageBucket: "dation-645f2.appspot.com",
  messagingSenderId: "169568227087",
  appId: "1:169568227087:web:c67d1b135a6b4a918ef87a"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);