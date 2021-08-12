import db from './firebase-connection.js';

export function sendSuggestion() {
  var suggestion = $("#suggestion-textarea").val();

  if (suggestion == null) {
    alert("Porfavor escribe una sugerencia.");
  } else {
    db.collection("suggestions").add({
      data: suggestion
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
