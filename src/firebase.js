import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseEduMain = firebaseDB.ref('education_main');
const firebaseEduAdd = firebaseDB.ref('education_additional');
const firebaseProjects = firebaseDB.ref('projects');

export {
  firebase,
  firebaseExp,
  firebaseRevs,
  firebasePromotions,
  firebaseDB,
  firebaseEduMain,
  firebaseEduAdd,
  firebaseProjects
};
