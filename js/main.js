import { db, sendPasswordReset, toggleSignIn, searchSuggestion } from './firebase-connection.js';

export function sendSuggestion() {
  var suggestion = $("#suggestion-textarea").val();

  if (suggestion == null) {
    alert("Porfavor escribe una sugerencia.");
  } else {
    db.collection("suggestions").add({
      data: suggestion,
      isCommented: false
  })
  .then((docRef) => {
      console.log("Suggestion written with ID: ", docRef.id);

      $('#suggestion-box').css('display','none');
      $('.alert').show();
      $("#suggestion-id-text").html("Tu sugerencia ha sido creada con el ID: " + docRef.id.toString());
  })
  .catch((error) => {
      console.error("Error adding suggestion: ", error);
  });
  }
}

export function sendComment(docId) {
  var comment = $("#" + docId + "textarea").val();

  if (comment == null) {
    alert("Porfavor escribe una sugerencia.");
  } else {
    console.log(docId);
    db.collection("suggestions").doc(docId).set({
      comment: comment,
      isCommented: true
    }, {merge: true})
  .then(() => {
      $('.alert1').show();
      $("#comment-text").html("Se ha comentado la sugerencia con ID: " + docId + " ha sido actualizada");
  })
  .catch((error) => {
      console.error("Error adding comment: ", error);
  });
  }
}

  window.addEventListener('load', function () {
    $("#pass-reset").click(function() {
      sendPasswordReset();
    });

    $("#login-btn").click(function() {
      toggleSignIn();
    });

    $("#search-button").click(function() {
      searchSuggestion();
    });
  })
