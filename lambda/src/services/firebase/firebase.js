const firebase = require('firebase-admin');

const FirebaseDbChild = function (path) {
  return getFirebaseApp().database().ref().child(path);
};

const FirebaseGetChildValue = function (path) {
  return new Promise((resolve, reject) => {
    getFirebaseApp()
      .database()
      .ref()
      .child(path)
      .once('value')
      .then((s) => {
        resolve(s.val());
      })
      .catch(reject);
  });
};

const FirebaseUpdatePaths = function (paths) {
  return new Promise((resolve, reject) => {
    getFirebaseApp()
      .database()
      .ref()
      .update(paths)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
};

const getFirebaseApp = () => {
  const firebaseCert = JSON.parse(process.env.firebaseCert);
  const firebasePath = process.env.firebasePath;
  if (!firebase.apps.length) {
    return firebase.initializeApp({
      credential: firebase.credential.cert(firebaseCert),
      databaseURL: firebasePath,
    });
  }
  return firebase;
};

module.exports = {
  Firebase: getFirebaseApp,
  FirebaseUpdatePaths,
  FirebaseGetChildValue,
  FirebaseDbChild,
};
