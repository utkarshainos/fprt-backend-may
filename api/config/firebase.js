import { initializeApp } from "firebase";
var firebase = initializeApp({
  apiKey: "AIzaSyAXU3TSc09LAfdiLyXTSiGUPirP6TE7amo",
  authDomain: "fprt-d0f32.firebaseapp.com",
  projectId: "fprt-d0f32",
  storageBucket: "fprt-d0f32.appspot.com",
  messagingSenderId: "412949316618",
  appId: "1:412949316618:web:0ed65192dedb1c5bb1cbf3",
});

var admin = require("firebase-admin");

var serviceAccount = require("../fprt-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://fprt-d0f32.appspot.com",
});

var bucket = admin.storage().bucket();

// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.

// export default firebase;
export default bucket;
