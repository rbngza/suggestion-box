import { sendSuggestion } from './main.js';

window.addEventListener('load', function () {
  $('#rh-button').click(function(){
    if ( $('#main').css('display') == 'none' ){
      $('#main').css('display','block');
      $('#suggest').css('display','none');
      $('#track-suggestion').css('display','none');
      $('#main-content').css('display','none');

      $("#rh-button").addClass("active");
      $("#suggest-button").removeClass("active");
      $("#track-button").removeClass("active");
    }
    else
    {
      $('#main-content').css('display','block');
      $('#main').css('display','none');
      $("#rh-button").removeClass("active");
    }
  });

  $('#suggest-button').click(function(){
    if ( $('#suggest').css('display') == 'none' ) {
      $('#main').css('display','none');
      $('#suggest').css('display','block');
      $('#track-suggestion').css('display','none');
      $('#main-content').css('display','none');

      $("#suggest-button").addClass("active");
      $("#rh-button").removeClass("active");
      $("#track-button").removeClass("active");
    }
    else{
      $('#main-content').css('display','block');
      $('#suggest').css('display','none');
      $("#suggest-button").removeClass("active");
    }
  });

  $('#track-button').click(function(){
    if ( $('#track-suggestion').css('display') == 'none' ){
      $('#main').css('display','none');
      $('#suggest').css('display','none');
      $('#track-suggestion').css('display','block');
      $('#main-content').css('display','none');

      $("#track-button").addClass("active");
      $("#rh-button").removeClass("active");
      $("#suggest-button").removeClass("active");
    }
    else{
      $('#main-content').css('display','block');
      $('#track-suggestion').css('display','none');
      $("#track-button").removeClass("active");
    }
  });

  $('#suggest2').click(function(){
    if ( $('#suggest').css('display') == 'none' ) {
      $('#main').css('display','none');
      $('#suggest').css('display','block');
      $('#track-suggestion').css('display','none');
      $('#main-content').css('display','none');

      $("#suggest-button").addClass("active");
      $("#rh-button").removeClass("active");
      $("#track-button").removeClass("active");
    }
    else{
      $('#main-content').css('display','block');
      $('#suggest').css('display','none');
      $("#suggest-button").removeClass("active");
    }
  });

  $("#send-suggestion").click(function() {
    sendSuggestion();
  });
})
