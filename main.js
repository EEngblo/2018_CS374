
// 전역변수 선언


var steps = ['Home', 'GPUandCPU', 'RAMandSto', 'Case', 'Final']; // mode(게임성능/활용도)에 따라서 step 결정
var steps_finished = [true, false, false, false, false]; // steps의 각 step이 완료되었는지 저장
var currentStepIdx = 0; // steps 배열에서 몇 번째 step을 진행중인지 표시
var help_ids = ["h_RAM", "h_storage_check", "h_storage", "h_frame", "h_GPU_score", "h_CPU_score", "h_SSD_indicator", "h_storage_indicator", "h_RAM_indicator", "h_CPU_indicator", "h_frame_indicator"];
 // help창 id들
var current_help = null; // 현재 떠 있는 help 창 object

var composition;


//////////////////////////////////////////////

// 견적 Class 선언

function Composition(){

  //console.log('Init... Making Suggeted Composition...');

  // URL query문에서 각 parameter 받아 옴
  budget = getParameterByName("budget");
  mode1 = getParameterByName("mode1");
  mode2 = getParameterByName("mode2");


  // 상단 가격바 초기 세팅
  $('#s_budget_value').html(parseInt(budget).toLocaleString('en'));


  this.CPU=-1; // -1은 선택되지 않음, 0 이상은 그 인덱스가 선택된
  this.GPU=-1;
  this.showGPUIdx = 0; // 이 인덱스 부터 표시하면 됨
  this.showCPUIdx = 0;

  this.performance_done=false;

  this.RAM=false;
  this.SSD=false;
  this.HDD=false;

  this.RAM_done=false;
  this.SSD_done=false;
  this.HDD_done=false;
  this.versatility_done=false;

  this.case_unlock=false;

  this.cards = [];
  this.CASE=-1;
  this.case_done=false;
  this.price=79000 + 93900 + 89500  ; // 최저옵션 가격
  this.budget=budget;

  this.MB = -1;
  this.PSU = 0;




  // breadcrumb init
  $('#b_root').append(breadcrumbContents[0]);

  // case page init
  this.CASES = initCase();


  // 성능-활용도 모드에 따라서 breadcrumb 순서 변경 및 기본 추천 견적 작성
  if(mode1 === "performanceMode"){
    // 게임 성능 우선 모드
    $('#b_root').append(breadcrumbContents[1]);
    $('#b_root').append(breadcrumbContents[2]);


    $('#d_root_GPUandCPU').attr('hidden', false);


  }else{
    // 활용도 모드

    // breadcrumb 순서 변경
    temp = steps[1];
    steps[1] = steps[2];
    steps[2] = temp;

    $('#b_root').append(breadcrumbContents[2]);
    $('#b_root').append(breadcrumbContents[1]);

    $('#d_root_RAMandSto').attr('hidden', false);
    $('#d_root_GPUandCPU').attr('hidden', true);

  }

  // breadcrumb 완성
  $('#b_root').append(breadcrumbContents[3]);
  $('#b_root').append(breadcrumbContents[4]);

  // button seting
  $('#m_previous_button_'+steps[1]).remove();

  if(mode2 === "simpleMode"){
    // 원클릭 모드

    $('#b_GPUandCPU_button').addClass('completed');
    $('#b_RAMandSto_button').addClass('completed');

    steps_finished[1] = true;
    steps_finished[2] = true;

    // 아래 두 줄은 실험용임. 추천 견적 함수 작성 후 삭제해야 함
    this.CPU=0;
    this.GPU=0;

    this.RAM_done=true;
    this.SSD_done=true;
    this.HDD_done=true;
    this.versatility_done=true;
    this.performance_done=true;
    this.case_unlock=true;

    moveStep('Case');
  }else{
    // 커스텀 모드
    // 추천 견적 작성 후, step2, step3에 대해서 미리 선택을 해 주어야 함

    $('#b_Case_button').addClass('disabled');
    $('#m_next_button_' + steps[2]).addClass('disabled');
    $('#m_next_button_' + steps[2]).attr('onclick', 'javascript:void(0)');
    $('#m_next_button_' + steps[2]).attr('data-tooltip', 'RAM, SSD, 하드디스크, 그래픽카드, CPU를 먼저 선택해 주세요');


    moveStep(steps[1]);
  }
  $('#b_Final_button').addClass('disabled');
  $('#m_next_button_Case').addClass('disabled');
  $('#m_next_button_Case').attr('onclick', 'javascript:void(0)');


  // 상단바 초기 세팅
  setSpecIndicator('SSD', 250, false);
  setSpecIndicator('Storage', 250, false);
  setSpecIndicator('RAM', this.RAM?16:8, false);


  // RAM이 16기가이면 RAM 생략
  if(this.RAM) $("#d_RAM").attr('hidden', true);

  //console.log('Success!!');


  this.updatePrice(this.price);

}

Composition.prototype = {



  set : function(target, value, highlight = true, debug = false){
    // 기존 값 복사 후 이를 이용해서 비용 변화 처리해야 함

    var oldp = 0;
    var newp = 0;

    // 가격 정보 업데이트
    switch(target){
      case 'RAM':
        oldp = this.RAM ? db_RAM[1].price : db_RAM[0].price;
        newp = value ? db_RAM[1].price : db_RAM[0].price;
        this.updatePrice(this.price - oldp + newp);
        break;
      case 'SSD':
        oldp = this.SSD ? db_SSD[1].price : db_SSD[0].price;
        newp = value ? db_SSD[1].price : db_SSD[0].price;
        this.updatePrice(this.price - oldp + newp);
        break;
      case 'HDD':
        oldp = this.HDD ? db_HDD[1].price : db_HDD[0].price;
        newp = value ? db_HDD[1].price : db_HDD[0].price;
        this.updatePrice(this.price - oldp + newp);
        break;
      case 'CASE':
        oldp = (this.CASE == -1) ? 79000 : db_CASE[this.CASE].price;
        newp = (value == -1) ? 79000 : db_CASE[value].price;
        this.updatePrice(this.price - oldp + newp);
        break;
    }

    console.log(newp - oldp);

    // target attr의 값을 value로 설정
    this[target] = value;

    if(debug) console.log(" now "+target+" is "+value);

    // 다음 단계로 진행 가능한지 검사
    var notCompleted = []

    if(!this.RAM_done)
      notCompleted.push("RAM");
    if(!this.SSD_done)
      notCompleted.push("SSD");
    if(!this.HDD_done)
      notCompleted.push("하드디스크");
    if(this.GPU < 0)
      notCompleted.push("그래픽카드");
    if(this.CPU < 0)
      notCompleted.push("CPU");

    if(this.RAM_done && this.SSD_done && this.HDD_done){
      // 활용도 부품 선택 완료
      this.versatility_done = true;
      $('#b_RAMandSto_button').addClass('completed');
    }else {
      this.versatility_done = false;
      $('#b_RAMandSto_button').removeClass('completed');
    }

    if(this.CPU >= 0 && this.GPU >= 0){
      // 성능 부품 선택 완료
      this.performance_done = true;
      $('#b_GPUandCPU_button').addClass('completed');
    }else{
      this.performance_done = false;
      $('#b_GPUandCPU_button').removeClass('completed');
    }

    if(this.CASE >= 0){
      this.case_done = true;
      $('#b_Case_button').addClass('completed');
    }else{
      this.case_done = false;
      $('#b_Case_button').removeClass('completed');
    }

    if(this.performance_done && this.versatility_done || this.case_unlock){
      // case 선택 단계로 넘어갈 수 있음!
      $('#b_Case_button').removeClass('disabled')
      $('#m_next_button_' + steps[2]).removeClass('disabled');
      $('#m_next_button_' + steps[2]).attr('onclick', 'moveStepButton(true);');
      $('#m_next_button_' + steps[2]).removeAttr('data-tooltip');

      this.case_unlock = true;

    }else{
      $('#b_Case_button').addClass('disabled')
      $('#m_next_button_' + steps[2]).addClass('disabled');
      $('#m_next_button_' + steps[2]).attr('onclick', 'void(0);');
      errorMessage = notCompleted.join(', ');
      errorMessage += notCompleted[notCompleted.length - 1] == "RAM" ? '을' : '를';
      $('#m_next_button_' + steps[2]).attr('data-tooltip', errorMessage +' 먼저 선택해 주세요');
    }

    if(this.CASE < 0)
      notCompleted.push('케이스');

    errorMessage = notCompleted.join(', ');
    errorMessage += notCompleted[notCompleted.length - 1] == "RAM" ? '을' : '를';

    if(this.case_done && this.performance_done && this.versatility_done){
      // 최종 확인 단계로 넘어갈 수 있음
      $('#b_Final_button').removeClass('disabled');
      $('#m_next_button_Case').removeClass('disabled');
      $('#m_next_button_Case').attr('onclick', 'moveStepButton(true);');
      $('#m_next_button_Case').removeAttr('data-tooltip');
    }else{
      $('#b_Final_button').addClass('disabled');
      $('#m_next_button_Case').addClass('disabled');
      $('#m_next_button_Case').attr('onclick', 'void(0);');
      $('#m_next_button_Case').attr('data-tooltip', errorMessage +' 먼저 선택해 주세요');

    }


    // 상단바 업데이트
    switch(target){
      case 'RAM':
        if(this.RAM){ // 16G RAM
          setSpecIndicator('RAM', 16, highlight);
        }else{ // 8G RAM
          setSpecIndicator('RAM', 8, highlight);
        }
        break;
      case 'SSD':
        if(this.SSD){ // 500G SSD
          setSpecIndicator('SSD', 500, highlight);
        }else{ // 250G SSD
          setSpecIndicator('SSD', 250, highlight);
        }
      case 'HDD':
        if(this.SSD && this.HDD){ // 500G SSD 1T HDD
          setSpecIndicator('Storage', 1500, highlight);
        }else if(this.SSD && !this.HDD){ // 500G SSD No HDD
          setSpecIndicator('Storage', 500, highlight);
        }else if(this.HDD){ // 250G SSD 1T HDD
          setSpecIndicator('Storage', 1250, highlight);
        }else{ // 250G SSD No HDD
          setSpecIndicator('Storage', 250, highlight);
        }
      break;
    }


  },

  // 이 함수 통해서 상단의 가격 indicator들 다 control하도록 하기
  updatePrice : function(price, highlight = true){
    highlight = highlight && this.price != price
    $('#s_price_value').html('₩ ' + price.toLocaleString('en'));
    $('#s_remainder_value').html( (this.budget - price).toLocaleString('en'));
    this.price = price;
    if(highlight) $('.stateIndicatorValue').effect( "highlight", {color:"#C8BFE7"}, 300 );
  }

}




//////////////////////////////////

window.onload = function(){
  composition = new Composition();
  loadCase();
  reloadCase();
  $('#d_root_Loader').attr('hidden', true);
}


$(document).ready(function(){




});

//////////////////////////////////////////////////

function moveStep(target){
  // target으로 들어온 단계로 넘어갈 수 있을 때, 그 단계로 넘어가는 함수

  // breadcrumb update
  $('#b_GPUandCPU_button').removeClass('active');
  $('#b_RAMandSto_button').removeClass('active');
  $('#b_Case_button').removeClass('active');
  $('#b_Final_button').removeClass('active');

  $('#b_' + target + '_button').addClass('active').blur();

  // main content update
  $('#d_root_GPUandCPU').attr('hidden', true);
  $('#d_root_RAMandSto').attr('hidden', true);
  $('#d_root_Case').attr('hidden', true);
  $('#d_root_Final').attr('hidden', true);

  $('#d_root_' + target).attr('hidden', false);

  // update currentStepIdx
  currentStepIdx = steps.indexOf(target);
  //////console.log(currentStepIdx);
}

function moveStepButton(isNext){
  // step 이동 버튼을 클릭했을 때 적절하게 이동하는 함수

  if(isNext){
    currentStepIdx++;
  }else{
    currentStepIdx--;
  }

  moveStep(steps[currentStepIdx]);
}

function setSpecIndicator(target, score, highlight=true){
  // target = {SSD, Storage, RAM, SPU, FPS}
  // 상단바 target의 점수를 score로 설정하고 highligh

  $('#s_'+target+'_value').html(score);
  if(highlight) $('#s_'+target).effect( "highlight", {color:"#C8BFE7"}, 300 );
}

function moveHome(){
  $('#b_home_button').blur();
  if(confirm("현재 작성 중인 견적이 사라지게 됩니다.\n정말 이동하시겠습니까?")){
    location.href="index.html";
  }
}

function SwitchHelp(n){
  if (current_help != null)
    current_help.style.display = "none";
  if(n==0){
    current_help = null;
    return;
  }
  current_help = document.getElementById(help_ids[n-1])
  current_help.style.display = "";
}

////////////////////////////////////////////////////////////////////

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// min (포함) 과 max (불포함) 사이의 임의 정수를 반환
// Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// CASE step의 case들 만드는 함수
function initCase(){
  var size = db_CASE.length;
  cards = []
  for(var i = 0; i < size; i++){


    var tempHTML = cardHTML.replace(/case00/g,"case"+ ("0" + i.toString()).slice (-2));
    tempHTML = tempHTML.replace(/__id__/, ("0" + i.toString()).slice(-2));
    //console.log(tempHTML);

    // DB 불러와서 각 ID에 맞게 수정
    tempHTML = tempHTML.replace(/__link__/, db_CASE[i].link);
    tempHTML = tempHTML.replace(/__img__/, './case/'+i+'-min.jpg');
    tempHTML = tempHTML.replace(/__name__/, db_CASE[i].name);
    tempHTML = tempHTML.replace(/__popular__/, Math.round(db_CASE[i].popular));

    difference = db_CASE[i].price - 79000;

    if(difference > 0){
      tempHTML = tempHTML.replace(/__color__/g, 'expensive');
      tempHTML = tempHTML.replace(/__price__/, '+ ₩ '+difference.toLocaleString('en'));
    }else{
      tempHTML = tempHTML.replace(/__color__/g, 'cheap');
      tempHTML = tempHTML.replace(/__price__/, '- ₩ '+ (-1 * difference).toLocaleString('en'));
    }

    cards.push(tempHTML);


  }

  return cards;
}

function makeFinalTable(){
  document.getElementById("f_CPU_img").src = "img/CPU/"+ toString(composition.CPU) +".jpg";
  document.getElementById("f_CPU_name").innerHTML = db_CPU[composition.CPU][name];
  document.getElementById("f_CPU_detail").href = db_CPU[composition.CPU][link];
  document.getElementById("f_CPU_price").innerHTML = db_CPU[composition.CPU][price];
  
  document.getElementById("f_mainboard_img").src = "img/MB/"+ toString(composition.MB) +".jpg";
  document.getElementById("f_mainboard_name").innerHTML = db_MB[composition.MB][name];
  document.getElementById("f_mainboard_detail").href = db_MB[composition.MB][link];
  document.getElementById("f_mainboard_price").innerHTML = db_MB[composition.MB][price];

  document.getElementById("f_GPU_img").src = "img/GPU/"+ toString(composition.GPU) +".jpg";
  document.getElementById("f_GPU_name").innerHTML = db_GPU[composition.GPU][name];
  document.getElementById("f_GPU_detail").href = db_GPU[composition.GPU][link];
  document.getElementById("f_GPU_price").innerHTML = db_GPU[composition.GPU][price];

  document.getElementById("f_RAM_img").src = "img/RAM.jpg";
  document.getElementById("f_RAM_name").innerHTML = db_RAM[composition.RAM][name];
  document.getElementById("f_RAM_detail").href = db_RAM[composition.RAM][link];
  document.getElementById("f_RAM_price").innerHTML = db_RAM[composition.RAM][price];

  document.getElementById("f_SSD_img").src = "img/SSD.jpg";
  document.getElementById("f_SSD_name").innerHTML = db_SSD[composition.SSD][name];
  document.getElementById("f_SSD_detail").href = db_SSD[composition.SSD][link];
  document.getElementById("f_SSD_price").innerHTML = db_SSD[composition.SSD][price];

  document.getElementById("f_HDD_img").src = "img/Hdd2.png";
  document.getElementById("f_HDD_name").innerHTML = db_HDD[composition.HDD][name];
  document.getElementById("f_HDD_detail").href = db_HDD[composition.HDD][link];
  document.getElementById("f_HDD_price").innerHTML = db_HDD[composition.HDD][price];

  document.getElementById("f_case_img").src = "img/CASE/"+ toString(composition.CASE) +".jpg";
  document.getElementById("f_case_name").innerHTML = db_CASE[composition.CASE][name];
  document.getElementById("f_case_detail").href = db_CASE[composition.CASE][link];
  document.getElementById("f_case_price").innerHTML = db_CASE[composition.CASE][price];

<<<<<<< HEAD
  document.getElementById("f_power_img").src = "img/PSU/"+ toString(composition.PSU) +".jpg";
  document.getElementById("f_power_name").innerHTML = db_PSU[composition.PSU][name];
  document.getElementById("f_power_detail").href = db_PSU[composition.PSU][link];
  document.getElementById("f_power_price").innerHTML = db_PSU[composition.PSU][price];
=======
  document.getElementById("f_power_img").src = "img/PS/"+ toString(composition.PS) +".jpg";
  document.getElementById("f_power_name").innerHTML = db_PS[composition.PS][name];
  document.getElementById("f_power_price").innerHTML = db_PS[composition.PS][price];

function myCompositions(){
  $('#m_myCompositions').blur();
  alert('3개의 task와 무관해 구현하지 않은 기능입니다. 죄송합니다.');

>>>>>>> e48abe1ea33e91c9470598a6a217e819f3e4ae0e
}





/////////////////

var cardHTML = '<div id="m_case00" class="card casecard">\
  <div class="blurring dimmable image">\
    <div class="ui dimmer">\
      <div class="content cardc">\
        <div class="center">\
          <div class="ui inverted button">\
            <a class="texts caseDetail"\
               href="__link__"\
               target="_blank">\
               상세정보 보기&nbsp;<i class="icon external alternate"></i></div>\
            </a>\
        </div>\
      </div>\
    </div>\
    <img src="__img__">\
  </div>\
  <div class="content cardc">\
    <div class="header cardheader texts">__name__</div>\
    <div class="meta texts">\
      <i class="users icon"></i>\
      인기도&nbsp;:&nbsp;\
      <div class="ui mini star rating" data-rating="__popular__" data-max-rating="5"></div>\
    </div>\
  </div>\
  <div id="m_button_case00" onclick="selectCase(__id__,this);" class="ui bottom inverted violet attached button texts">\
    <div id="m_pricetext_case00">\
      <i id="m_cart_case00" class="shopping cart icon __color__"></i>\
      <strong id="m_price_case00" class="texts __color__">__price__</strong>\
    </div>\
    <div hidden id="m_selected_case00">\
      선택됨\
    </div>\
  </div>\
</div>'
