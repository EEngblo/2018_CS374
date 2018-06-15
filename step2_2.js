$( document ).ready(function() {



  $('.m_RAM_explanation').dimmer({
    on: 'hover'
  });

  $('.m_SSD_explanation').dimmer({
    on: 'hover'
  });
});

function modeButtonClickHandler(attr, value, id, otherId, highlight = true){

  var idtext = $(id).attr('id');
  var oidtext = $(otherId).attr('id');

  $(id).removeClass('basic');
  $(id).addClass('inverted');

  if($(id).hasClass('active')){
    /*if($(id).hasClass('modeButton2')){
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
    */
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
    composition.set(attr, value, highlight);
  }else{

    composition[attr+'_done'] = false;
    $('#' + idtext +'_text').attr('hidden', !value);
    $('#' + oidtext +'_text').attr('hidden', value);

    composition.set(attr, false, value);
  }

  //checkNextStep();



}

function modeButtonHoverHandler(id, other, isRAM = false){
  if(! $(id).hasClass('active')){
    $(id).removeClass('inverted');
    $(id).addClass('basic');

    //console.log(isRAM);
    if(composition.RAM && !composition.RAM_done && isRAM){
      //console.log(isRAM);

      if($(id).hasClass('highoption') && $(other).hasClass('active')){

        var increament = null;

        if($(id).hasClass('RAM')){
          increament = 91600;
        }else if($(id).hasClass('SSD')){
          increament = 64000;
        }else if($(id).hasClass('HDD')){
          increament = 47150;
        }

        if(increament !== null){
          pricebar_hoverstart(increament);
        }

      }else if(! $(id).hasClass('highoption') && ($(other).hasClass('active') || ! $(id).hasClass('active'))){
        //console.log(1);
        var increament = null;

        if($(id).hasClass('RAM')){
          increament = -91600;
        }else if($(id).hasClass('SSD')){
          increament = -64000;
        }else if($(id).hasClass('HDD')){
          increament = -47150;
        }

        if(increament !== null){
          pricebar_hoverstart(increament);
        }
      }
    }else{
      if($(id).hasClass('highoption')){

        var increament = null;

        if($(id).hasClass('RAM')){
          increament = 91600;
        }else if($(id).hasClass('SSD')){
          increament = 64000;
        }else if($(id).hasClass('HDD')){
          increament = 47150;
        }

        if(increament !== null){
          pricebar_hoverstart(increament);
        }

      }else if($(other).hasClass('active')){
        //console.log(1);
        var increament = null;

        if($(id).hasClass('RAM')){
          increament = -91600;
        }else if($(id).hasClass('SSD')){
          increament = -64000;
        }else if($(id).hasClass('HDD')){
          increament = -47150;
        }

        if(increament !== null){
          pricebar_hoverstart(increament);
        }
      }
    }

  }
}

function modeButtonHoverEndHandler(id){
  $(id).removeClass('basic');
  $(id).addClass('inverted');

  pricebar_hoverend();
}
