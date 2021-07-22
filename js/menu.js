window.addEventListener('load', function () {
  $('#rh-button').click(function(){
    if ( $('#main').css('display') == 'none' ){
      $('#main').css('display','block');
      $('#suggest').css('display','none');
      $('#track-suggestion').css('display','none');

      $("#rh-button").addClass("active");
      $("#suggest-button").removeClass("active");
      $("#track-button").removeClass("active");
    }
    else
    {
      $('#main').css('display','none');
      $("#rh-button").removeClass("active");
    }
  });

  $('#suggest-button').click(function(){
    if ( $('#suggest').css('display') == 'none' ) {
      $('#main').css('display','none');
      $('#suggest').css('display','block');
      $('#track-suggestion').css('display','none');

      $("#suggest-button").addClass("active");
      $("#rh-button").removeClass("active");
      $("#track-button").removeClass("active");
    }
    else{
      $('#suggest').css('display','none');
      $("#suggest-button").removeClass("active");
    }
  });

  $('#track-button').click(function(){
    if ( $('#track-suggestion').css('display') == 'none' ){
      $('#main').css('display','none');
      $('#suggest').css('display','none');
      $('#track-suggestion').css('display','block');

      $("#track-button").addClass("active");
      $("#rh-button").removeClass("active");
      $("#suggest-button").removeClass("active");
    }
    else{
      $('#track-suggestion').css('display','none');
      $("#track-button").removeClass("active");
    }
  });
})
