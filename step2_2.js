

function modeButtonClickHandler(attr, value, id, otherId){

  var idtext = $(id).attr('id');
  var oidtext = $(otherId).attr('id');

  $(id).removeClass('basic');
  $(id).addClass('inverted');

  if($(id).hasClass('active')){
    if($(id).hasClass('modeButton2')){
      mode2Check = false;
    } else{
      modeCheck = false;
    }
    $(id).removeClass('active');
    $(id).blur();
    // 클릭시 다른 쪽 설정이 자동으로 선택되게 하려면 주석 해제
    //$(otherId).addClass('active');
    //modeCheck= true;
    $(id).removeClass('inverted');
    $(id).addClass('basic');

  }else {
    $(id).addClass('active');
    $(otherId).removeClass('active');
    if($(id).hasClass('modeButton2')){
      mode2Check = true;
      final2Mode = id;
    } else{
      modeCheck = true;
      finalMode = id;
    }

  }


  if($(id).hasClass('active')){

    composition[attr+'_done'] = true;
    $('#' + idtext +'_text').attr('hidden', true);
    $('#' + oidtext +'_text').attr('hidden', false);
    composition.set(attr, value);
  }else{

    composition[attr+'_done'] = false;
    $('#' + idtext +'_text').attr('hidden', !value);
    $('#' + oidtext +'_text').attr('hidden', value);
    composition.set(attr, false, value);
  }

  //checkNextStep();



}

function modeButtonHoverHandler(id){
  if(! $(id).hasClass('active')){
    $(id).removeClass('inverted');
    $(id).addClass('basic');
  }
}

function modeButtonHoverEndHandler(id){
  $(id).removeClass('basic');
  $(id).addClass('inverted');
}
