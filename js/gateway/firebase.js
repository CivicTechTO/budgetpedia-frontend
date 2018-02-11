'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const fireapp = firebase.initializeApp({
    apiKey: "AIzaSyB3-RFiL63BlUtZ56CmL9TpDUJRAd0LLlw",
    authDomain: "budgetpedia-89c3d.firebaseapp.com",
    databaseURL: "https://budgetpedia-89c3d.firebaseio.com",
    projectId: "budgetpedia-89c3d",
    storageBucket: "budgetpedia-89c3d.appspot.com",
    messagingSenderId: "66994833687",
});
exports.default = fireapp;
