function tempmp(){
  composition.RAM = !composition.RAM;
}


function modeButtonClickHandler(id, otherId){

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
  //checkNextStep();

  tempmp();
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
