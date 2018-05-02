// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {

  var budgetInputbox = document.getElementById('budgetInputbox');
  var budgetSubmit = document.getElementById('budgetSubmit');

  // 예산 슬라이더 handler
  $( "#budgetSlider" ).slider({
    range: "min",
    value: 650000,
    min: 650000,
    max: 1150000,
    step: 10000,
    slide: function( event, ui ) {
      $( "#budgetInputbox" ).val( Number(ui.value).toLocaleString('en') );
    }
  });

  // 예산 text 입력 자동완성 handler
  $( "#budgetInputbox" ).autocomplete({
    minLength:2,
    autofocus: true,
    source: function(request, response){
      var temp = request.term;

      if(100 <= temp && temp <= 115){
        var answer = [temp*10000];
      }else if(1000 <= temp && temp <= 1150 && (temp % 10) == 0){
        var answer = [temp*1000];
      }else if(10000 <= temp && temp <= 11500 && (temp % 100) == 0){
        var answer = [temp*100];
      }else if(100000 <= temp && temp <= 115000 && (temp % 1000) == 0){
        var answer = [temp*10];
      }else if(65 <= temp && temp <= 99){
        var answer = [temp*10000];
      }else if(650 <= temp && temp <= 990 && (temp % 10) == 0){
        var answer = [temp*1000];
      }else if(6500 <= temp && temp <= 9900 && (temp % 100) == 0){
        var answer = [temp*100];
      }else if(65000 <= temp && temp <= 99000 && (temp % 1000) == 0){
        var answer = [temp*10];
      }else{
        response([]);
        return;
      }
      response([answer.toString()]);
    },
    response: function(event, ui){
      if(ui.content.length == 1){
        //console.log(ui.content[0]);
        $(this).val(ui.content[0].value);
        var temp = parseInt(ui.content[0].value);
        $( "#budgetSlider").slider( "value", temp);
        $( "#budgetSubmit" ).attr('disabled', true);
        $(this).autocomplete("close");
      }
    },
    select: function(event, ui){
      //console.log(ui.item.value);
      var temp = parseInt(ui.item.value.replace(/,/g,''));
      $( "#budgetInputbox" ).val( parseInt(ui.item.value).toLocaleString('en') )
      $( "#budgetSlider").slider( "value", temp);
    }

  });



  // 예산 text 입력 -> 변경 버튼 click handler
  $( "body" ).on("click", "#budgetSubmit", function(){
    var temp = parseInt($( "#budgetInputbox" ).val().replace(/,/g, ''));
    $( "#budgetSlider").slider( "value", temp);
    $( "#budgetSubmit" ).attr('disabled', true);
    $( "#budgetInputbox" ).val(Number($("#budgetSlider").slider("value")).toLocaleString("en"));
  });

  // 예산 text 입력 -> 변경 버튼 click handler
  $( "body" ).on("change", "#budgetInputbox", function(){
    //console.log($("budgetInputbox").val());
  });

  // '게임 성능' 버튼 click hanlder
  $( "body" ).on("click", "performanceMode", function(){
    alert();
  });
});

// budgetInputbox onblur handler
function budgetInputboxOnblur(){
  var temp = parseInt($( "#budgetInputbox" ).val().replace(/,/g, ''));
  if (isNaN(temp) || temp  < 650000 || temp > 1150000){
    $( "#budgetInputbox" ).val(Number($("#budgetSlider").slider("value")).toLocaleString("en"));
    return;
  }else {
    $( "#budgetInputbox" ).val(Number(temp).toLocaleString("en"));
  }
  if(temp !== $("#budgetSlider").slider("value")){
    //console.log(temp);
    //console.log($("#budgetSlider").slider("value"));
    $( "#budgetSubmit" ).attr('disabled', false);
  }
}

function modeButtonClickHandler(id, otherId){

  $(id).removeClass('basic');
  $(id).addClass('inverted');

  if($(id).hasClass('active')){
    $(id).removeClass('active');
    $(id).blur();
    $(otherId).addClass('active');
    $(id).removeClass('inverted');
    $(id).addClass('basic');
  }else {
    $(id).addClass('active');
    $(otherId).removeClass('active');
  }
}

function modeButtonHoverHandler(id){
  $(id).removeClass('inverted');
  $(id).addClass('basic');
}

function modeButtonHoverEndHandler(id){
  $(id).removeClass('basic');
  $(id).addClass('inverted');
}

function modeButtonHelper(id){
  if(id==0){ // 성능 버튼
    console.log('performance!');
  }else{ // 활용도 버튼
    console.log('versatility!');
  }
}
