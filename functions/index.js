const functions = require('firebase-functions');

const createUser = require('./create_user');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.goodBye = functions.https.onRequest((request, response) => {
 response.send("GoodBye!");
});

exports.createUser = functions.https.onRequest(createUser);
