var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://joobify-default-rtdb.asia-southeast1.firebasedatabase.app"
});

firebaseAdmin.firestore().settings({ ignoreUndefinedProperties: true });

module.exports = firebaseAdmin;