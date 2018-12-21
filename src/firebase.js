import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

var config = {
  apiKey: 'AIzaSyBM3nDz4nQhU1RrUXGPzJO6QBoNvklr61k',
  authDomain: 'personal-page-dac5f.firebaseapp.com',
  databaseURL: 'https://personal-page-dac5f.firebaseio.com',
  projectId: 'personal-page-dac5f',
  storageBucket: 'personal-page-dac5f.appspot.com',
  messagingSenderId: '355329486684'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseExp = firebaseDB.ref('experience');
const firebaseRevs = firebaseDB.ref('reviews');

export { firebase, firebaseExp, firebaseRevs };
