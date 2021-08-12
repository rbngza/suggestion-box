import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

  var firebaseConfig = {
    apiKey: "AIzaSyAUL68mRaXgRe6wZouYtGagSHBRahaDzO0",
    authDomain: "suggestion-box-e3582.firebaseapp.com",
    projectId: "suggestion-box-e3582",
    storageBucket: "suggestion-box-e3582.appspot.com",
    messagingSenderId: "254706160006",
    appId: "1:254706160006:web:9b6370e8ed52ca96521c07",
    measurementId: "G-25E0PMJJV9"
  };

  var app = firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore(app);

  function toggleSignIn() {
    if (firebase.auth().currentUser != null) {
      alert('User already signed in.');
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
          // Signed in
          initUI();
          hideLogin();
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('btn-sign-in').disabled = false;
          // [END_EXCLUDE]
        });

      // [END authwithemail]
    }
    document.getElementById('btn-sign-in').disabled = true;
  }

  function sendPasswordReset() {
    var email = document.getElementById('email').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }

  function hideLogin(){
    $('#login-box').css('display','none');
  }

  function initUI(){
    $('#loggedin-box').css('display','block');

  }

window.addEventListener('load', function () {
  $("#pass-reset").click(function() {
    sendPasswordReset();
  });
})

  export default db;
