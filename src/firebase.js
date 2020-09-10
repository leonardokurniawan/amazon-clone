import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyB_BakL3_neumoWTYowZ9A80wJlYr9Irhw',
	authDomain: 'clone-react01.firebaseapp.com',
	databaseURL: 'https://clone-react01.firebaseio.com',
	projectId: 'clone-react01',
	storageBucket: 'clone-react01.appspot.com',
	messagingSenderId: '962881323179',
	appId: '1:962881323179:web:cda09ec783619663e7f7ee',
	measurementId: 'G-FF218H8LLE',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
