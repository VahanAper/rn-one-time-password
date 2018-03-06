const functions = require('firebase-functions');
const admin = require('firebase-admin');

const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-d23be.firebaseio.com",
});

exports.createUser = functions.https.onRequest(createUser);
 