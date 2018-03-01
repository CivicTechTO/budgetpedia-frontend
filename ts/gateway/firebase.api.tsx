// firebase.api.tsx

'use strict'

import * as firebase from 'firebase'

import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyB3-RFiL63BlUtZ56CmL9TpDUJRAd0LLlw",
    authDomain: "budgetpedia-89c3d.firebaseapp.com",
    databaseURL: "https://budgetpedia-89c3d.firebaseio.com",
    projectId: "budgetpedia-89c3d",
    storageBucket: "budgetpedia-89c3d.appspot.com",
    messagingSenderId: "66994833687",
})

let firebaseapi = firebase

export default firebaseapi