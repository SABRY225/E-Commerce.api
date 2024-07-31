require('dotenv').config()
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUT_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId:process.env.MESSAGING_SENDERID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

module.exports = { firebaseConfig };
