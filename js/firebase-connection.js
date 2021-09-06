import firebase from "firebase/app";
import {
  sendComment
} from './main.js';

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

function hideLogin() {
  $('#login-box').css('display', 'none');
}

function initUI() {
  $('#loggedin-box').css('display', 'block');
}

function addListener(docId) {
  console.log("#" + docId, " listener created");
  $("#" + docId).click(function() {
    sendComment(docId);
  });
}

function createDiv(data, docid, isCommented) {
  var cardDiv = document.createElement("div");
  var headerDiv = document.createElement("div");
  var bodyDiv = document.createElement("div");

  cardDiv.className = "card";
  headerDiv.className = "card-header";
  bodyDiv.className = "card-body";

  cardDiv.appendChild(headerDiv);
  cardDiv.appendChild(bodyDiv);

  var titleH5 = document.createElement("h5");
  var textPar = document.createElement("p");

  textPar.innerText = data.data;
  titleH5.className = "card-title";
  titleH5.innerText = docid;
  textPar.className = "card-text";
  bodyDiv.className = "card-body";

  bodyDiv.appendChild(titleH5);
  bodyDiv.appendChild(textPar);

  if (isCommented) {
    var textPar2 = document.createElement("p");
    textPar2.innerText = "Comentario: " + data.comment;
    textPar2.className = "card-text";
    bodyDiv.appendChild(textPar2);
  } else {
    var textarea = document.createElement("textarea");
    var commentButton = document.createElement("button");

    textarea.id = docid + "textarea";
    textarea.rows = 4;
    textarea.cols = 50;
    commentButton.className = "btn btn-primary";
    commentButton.innerText = "Comment";
    commentButton.id = docid;

    bodyDiv.appendChild(textarea);
    bodyDiv.appendChild(commentButton);
  }

  return cardDiv;
}

function loadSuggestions() {
  var db = firebase.firestore();
  var masterDiv = document.getElementById("loggedin-box");
  //Obtaining the data collection from the data base
  db.collection("suggestions").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      var div = createDiv(data, doc.id, data.isCommented);
      masterDiv.appendChild(div);
      addListener(doc.id);
    });
  });
}

var toggleSignIn = function() {
  if (firebase.auth().currentUser != null) {
    alert('User already signed in.');
    initUI();
    hideLogin();
    loadSuggestions();
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
        loadSuggestions();
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
        document.getElementById('login-btn').disabled = false;
        // [END_EXCLUDE]
      });

    // [END authwithemail]
  }
  document.getElementById('login-btn').disabled = true;
}

var sendPasswordReset = function() {
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

function searchSuggestion() {
  var inputId = $("#suggestion-docid").val();
  var db = firebase.firestore();
  var masterDiv = document.getElementById("search-card");
  //Obtaining the data collection from the data base

  console.log(inputId);
  var docRef = db.collection("suggestions").doc(inputId);

  docRef.get().then((doc) => {
    if (doc.exists) {
      var data = doc.data();
      var div = createDiv(data, doc.id, data.isCommented);
      masterDiv.appendChild(div);
      addListener(doc.id);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

}

export {
  db,
  sendPasswordReset,
  toggleSignIn,
  searchSuggestion
}
