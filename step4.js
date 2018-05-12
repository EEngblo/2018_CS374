$( document ).ready(function() {



  $('.special.cards .image').dimmer({
    on: 'hover'
  });


  $(".rating").rating('disable');

  $( ".sideFilter" ).controlgroup();

  $( ".colorFilter" ).controlgroup()

});

function selectCase(oid, id){
  var realId = $(id).attr('id');
  var oid = parseInt(oid);

  if($(id).hasClass('active')){
    composition.set('CASE', -1, true, true);
    $(id).addClass('inverted');
    $(id).removeClass('active');
  }else{
    composition.set('CASE', oid, true, true);

    for(var i = 0; i<composition.CASES.length; i++){
      temp = "#m_button_case" + ("0" + i.toString()).slice(-2);
      $(temp).addClass('inverted');
      $(temp).removeClass('active');
    }

    $(id).removeClass('inverted');
    $(id).addClass('active');
  }
}

function loadCase(){
  for(var i = 0; i < composition.CASES.length; i++){
    $('#m_cards').append(composition.CASES[i]);

    $('.special.cards .image').dimmer({
      on: 'hover'
    });

    $(".rating").rating('disable');
  }
}
