
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
  this.price=79000 + 93900 + 89500 + db_CPUandMB[0] + db_GPU[0].price  ; // 최저옵션 가격
  this.budget=budget;

  this.simpleMode = mode2 === 'simpleMode';
  this.performanceMode = mode1 === 'performanceMode';

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

    // 추천 견적 생성
    if(this.budget >= 684950){
      this.showGPUIdx = 1;
      this.updatePrice(this.price - db_GPU[0].price + db_GPU[1].price);
    }
    if(this.budget >= 829200){
      this.showCPUIdx = 1;
      this.updatePrice(this.price - db_CPUandMB[0] + db_CPUandMB[1]);
    }
    if(this.budget >= 920800){
      this.showGPUIdx = 3;
      this.updatePrice(this.price - db_GPU[1].price + db_GPU[3].price);
    }
    if(this.budget >= 1059800){
      this.showCPUIdx = 3;
      this.updatePrice(this.price - db_CPUandMB[1] + db_CPUandMB[3]);
    }


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


    // CPU, GPU 순서 변경
    var list = $('#d_root_GPUandCPU');
    var listItems = list.children('.dr_tableContent');
    list.append(listItems.get().reverse());
    $('#d_GPU').removeClass('dr_left').addClass('dr_right');
    $('#d_CPU').removeClass('dr_right').addClass('dr_left');

    // 추천 견적 생성
    if(this.budget >= 684950){
      this.showGPUIdx = 1;
      this.updatePrice(this.price - db_GPU[0].price + db_GPU[1].price);
    }
    if(this.budget >= 733200){
      this.showCPUIdx = 1;
      this.updatePrice(this.price - db_CPUandMB[0] + db_CPUandMB[1]);
    }
    if(this.budget >= 935950){
      this.RAM = true;
      this.updatePrice(this.price - db_RAM[0].price + db_RAM[1].price);
    }
    if(this.budget >= 1010950){
      this.showCPUIdx = 3;
      this.updatePrice(this.price - db_CPUandMB[1] + db_CPUandMB[3]);
    }


  }


  this.minPrice = this.price;
  $('#s_pricebar_current').css('width', (this.minPrice / this.budget * 100).toString() + '%');

  // breadcrumb 완성
  $('#b_root').append(breadcrumbContents[3]);
  $('#b_root').append(breadcrumbContents[4]);

  // button seting
  $('#m_previous_button_'+steps[1]).remove();

  // 상단바 초기 세팅
  setSpecIndicator('SSD', 250, false);
  setSpecIndicator('Storage', 250, false);
  setSpecIndicator('RAM', this.RAM?16:8, false);

  if(mode2 === "simpleMode"){
    // 원클릭 모드

    $('#b_GPUandCPU_button').addClass('completed');
    $('#b_RAMandSto_button').addClass('completed');

    steps_finished[1] = true;
    steps_finished[2] = true;


    this.CPU = this.showCPUIdx;
    this.GPU = this.showGPUIdx;
    this.set('SSD', false, highlight = false);
    this.set('HDD', false, highlight = false);

    this.RAM_done=true;
    this.SSD_done=true;
    this.HDD_done=true;
    this.versatility_done=true;
    this.performance_done=true;
    this.case_unlock=true;

    if(mode1 === "performanceMode"){

      if(this.budget >= 684950)
        this.set('GPU', 1, highlight = false);
      if(this.budget >= 733200)
        this.set('CPU', 1, highlight = false);
      if(this.budget >= 776230)
        this.set('CPU', 2, highlight = false);
      if(this.budget >= 781110){
        this.set('CPU', 1, highlight = false);
        this.set('GPU', 2, highlight = false);
      }
      if(this.budget >= 829200)
        this.set('GPU', 3, highlight = false);
      if(this.budget >= 841690)
        this.set('GPU', 4, highlight = false);
      if(this.budget >= 884720)
        this.set('CPU', 2, highlight = false);
      if(this.budget >= 916690)
        this.set('CPU', 3, highlight = false);
      if(this.budget >= 954810)
        this.set('GPU', 5, highlight = false);
      if(this.budget >= 1001960)
        this.set('HDD', true, highlight = false);
      if(this.budget >= 1018810){
        this.set('HDD', false, highlight = false);
        this.set('SSD', true, highlight = false);
      }
      if(this.budget >= 1065960)
        this.set('HDD',true, highlight = false);
      if(this.budget >= 1104010){
        this.set('HDD', false, highlight = false);
        this.set('RAM', true, highlight = false);
      }

    }else{
      if(this.budget >= 684950)
        this.set('GPU', 1, highlight = false);
      if(this.budget >= 733200)
        this.set('CPU', 1, highlight = false);
      if(this.budget >= 776320)
        this.set('CPU', 2, highlight = false);
      if(this.budget >= 797200){
        this.set('CPU', 1, highlight = false);
        this.set('SSD', true, highlight = false);
      }
      if(this.budget >= 840230)
        this.set('CPU', 2, highlight = false);
      if(this.budget >= 872220)
        this.set('CPU', 3, highlight = false);
      if(this.budget >= 935410)
        this.set('CPU', 5, highlight = false);
      if(this.budget >= 963800){
        this.set('CPU', 3, highlight = false);
        this.set('RAM', true, highlight = false);
      }
      if(this.budget >= 1011710)
        this.set('GPU', 2, highlight = false);
      if(this.budget >= 1027010){
        this.set('GPU', 1, highlight = false);
        this.set('CPU', 5, highlight = false);
      }
      if(this.budget >= 1074160)
        this.set('HDD', true, highlight = false);
      if(this.budget >= 1122070)
        this.set('GPU', 2, highlight = false);
    }

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


  //if(this.RAM) this.RAM_done= true;

  $('#b_Final_button').addClass('disabled');
  $('#m_next_button_Case').addClass('disabled');
  $('#m_next_button_Case').attr('onclick', 'javascript:void(0)');





  // RAM이 16기가이면 RAM 생략
  //if(this.RAM) $("#d_RAM").attr('hidden', true);

  //console.log('Success!!');

  this.updatePrice(this.price);


}

Composition.prototype = {



  set : function(target, value, highlight = true, debug = false){
    // 기존 값 복사 후 이를 이용해서 비용 변화 처리해야 함
    //if(highlight) console.log(target, value);
    var oldp = 0;
    var newp = 0;

    // 가격 정보 업데이트
    switch(target){
      case 'RAM':
        oldp = this.RAM ? db_RAM[1].price : db_RAM[0].price;
        newp = value ? db_RAM[1].price : db_RAM[0].price;
        this.updatePrice(this.price - oldp + newp, highlight);
        break;
      case 'SSD':
        oldp = this.SSD ? db_SSD[1].price : db_SSD[0].price;
        newp = value ? db_SSD[1].price : db_SSD[0].price;
        this.updatePrice(this.price - oldp + newp, highlight);
        break;
      case 'HDD':
        oldp = this.HDD ? db_HDD[1].price : db_HDD[0].price;
        newp = value ? db_HDD[1].price : db_HDD[0].price;
        this.updatePrice(this.price - oldp + newp, highlight);
        break;
      case 'CPU':
        oldp = (this.CPU == -1) ? db_CPUandMB[this.showCPUIdx] : db_CPUandMB[this.CPU];
        newp = (value == -1) ? db_CPUandMB[this.showCPUIdx] : db_CPUandMB[value];
        this.updatePrice(this.price - oldp + newp, highlight);
        break;
      case 'GPU':
        oldp = (this.GPU == -1) ? db_GPU[this.showGPUIdx].price : db_GPU[this.GPU].price;
        newp = (value == -1) ? db_GPU[this.showCPUIdx] : db_GPU[value].price;
        this.updatePrice(this.price - oldp + newp, highlight);
        break;
      case 'CASE':
        oldp = (this.CASE == -1) ? 79000 : db_CASE[this.CASE].price;
        newp = (value == -1) ? 79000 : db_CASE[value].price;
        this.updatePrice(this.price - oldp + newp, highlight);
        break;
    }

    if(debug) console.log(newp - oldp);

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

    remainder = (this.budget - price);
    $('#s_remainder_value').html( remainder.toLocaleString('en'));

    if(remainder < 0){
      $('#s_remainder_value').addClass("expensive");
      $('#s_remainder_symbol').addClass("expensive");
      $('#s_price_value').addClass("expensive");

    }else{
      $('#s_remainder_value').removeClass("expensive");
      $('#s_remainder_symbol').removeClass("expensive");
      $('#s_price_value').removeClass("expensive");
    }

    /*
    if(remainder < -50000){
      $('.stateIndicator').css('background-image', "linear-gradient(to bottom,#ffabab 0,#ffffff 100%)");
    }else{
      $('.stateIndicator').css('background-image', "linear-gradient(to bottom,#e8e8e8 0,#f5f5f5 100%)");
    }
    */
    this.price = price;
    //console.log(price);
    if(highlight){
      $('.stateIndicatorValue').effect( "highlight", {color:"#C8BFE7"}, 300 );
    }
      if(this.price <= this.budget){
        //console.log((this.price / this.budget * 100).toString());

        $('#s_pricebar_current').css('width', (this.price / this.budget * 100).toString() + "%");
        $('#s_pricebar_overflow').css('width', "0%");

      }else{
        $('#s_pricebar_willoverflow').addClass('realoverflow');
        var remainder = 2 * this.budget - this.price ;
        remainder = remainder <= 0 ? 0 : remainder;

        $('#s_pricebar_current').css('width', (remainder / this.budget * 100).toString() + "%");
        $('#s_pricebar_overflow').css('width', ((this.budget - remainder) / this.budget * 100).toString() + "%");

      }

      pricebar_hoverend();
      $('#s_pricebar_willoverflow').removeClass('realoverflow');


  }
}


function pricebar_hoverstart(increament){
  //console.log(increament);
  if(increament >= 0){
    if(increament + composition.price <= composition.budget){
      $("#s_pricebar_hoverplus").css('width', (increament / composition.budget * 100).toString() + "%" );
    }else if(composition.price > composition.budget){
      $("#s_pricebar_ongoingoverflow").css('width', (increament / composition.budget * 100).toString() + "%" );

      var remainder = 2 * composition.budget - composition.price - increament;
      remainder = remainder <= 0 ? 0 : remainder;
      $('#s_pricebar_current').css('width', (remainder / composition.budget * 100).toString() + "%");

    }else{
      var overflown_amount = ((composition.price + increament - composition.budget) / composition.budget * 100);
      var remainder =  ((composition.budget - composition.price) / composition.budget * 100);
      $("#s_pricebar_willoverflow").css('width', remainder.toString() + "%");
      $("#s_pricebar_ongoingoverflow").css('width', overflown_amount.toString() + "%");
      $("#s_pricebar_current").css('width', (100-remainder-overflown_amount).toString() + "%");

    }
  }else{

    if(increament + composition.price <= composition.budget){

      //$('#s_pricebar_current').removeClass('overflown_pricebar');

      $("#s_pricebar_current").css('width', ((composition.price + increament) / composition.budget * 100).toString() + "%" );

      if(composition.price <= composition.budget){
        $("#s_pricebar_hoverminus").css('width', (-1 * increament / composition.budget * 100).toString() + "%" );
      }else{
        var remainder = 2 * composition.budget - composition.price ;
        remainder = remainder <= 0 ? 0 : remainder;
        $("#s_pricebar_hoverminus").css('width', (remainder / composition.budget * 100).toString() + "%");
        $('#s_pricebar_overflow').css('width', "0%");
        $('#s_pricebar_hoverminus').css('width', ((composition.budget - composition.price - increament) / composition.budget * 100).toString() + "%");
      }


    }else {
      var remainder = 2 * composition.budget - composition.price ;
      remainder = remainder <= 0 ? 0 : remainder;
      $('#s_pricebar_overflow').css('width', ((composition.budget - remainder + increament) / composition.budget * 100).toString() + "%");
      $('#s_pricebar_decreasingoverflow').css('width', (-1 * increament / composition.budget * 100).toString() + "%" );
    }
  }
}

function pricebar_hoverend(){
    $("#s_pricebar_hoverplus").css('width', '0%');
    $("#s_pricebar_hoverminus").css('width', '0%');
    $("#s_pricebar_willoverflow").css('width', '0%');
    $("#s_pricebar_ongoingoverflow").css('width', '0%');
    $("#s_pricebar_decreasingoverflow").css('width', '0%');
    if(composition && composition.price <= composition.budget) {
      $('#s_pricebar_current').css('width', (composition.price / composition.budget * 100).toString() + "%");
    }else if(composition){
      var remainder = 2 * composition.budget - composition.price ;
      remainder = remainder <= 0 ? 0 : remainder;
      $('#s_pricebar_current').css('width', (remainder / composition.budget * 100).toString() + "%");
      $('#s_pricebar_overflow').css('width', ((composition.budget - remainder) / composition.budget * 100).toString() + "%");
      $("#s_pricebar_ongoingoverflow").css('width', "0%" );

    }
}


//////////////////////////////////

window.onload = function(){
  composition = new Composition();
  loadCase();
  reloadCase();

  if(composition.simpleMode){
    if(composition.SSD)
      modeButtonClickHandler('SSD', true, '#d_SSD_500G_button', '#d_SSD_250G_button', false);
    else
      modeButtonClickHandler('SSD', false, '#d_SSD_250G_button', '#d_SSD_500G_button', false);

    if(composition.HDD)
      modeButtonClickHandler('HDD', true, '#d_HDD_1T_button', '#d_HDD_NO_button', false);
    else
      modeButtonClickHandler('HDD', false, '#d_HDD_NO_button', '#d_HDD_1T_button', false);

    if(composition.RAM)
      modeButtonClickHandler('RAM', true, '#d_RAM_16G_button', '#d_RAM_8G_button', false);
    else
      modeButtonClickHandler('RAM', false, '#d_RAM_8G_button', '#d_RAM_16G_button', false);
  }else{

    if(composition.RAM){
        $('#d_RAM_8G_button_text').attr('hidden',false);
        $('#d_RAM_16G_button_text').attr('hidden',true);
    }
  }

  composition.updatePrice(composition.price);


  $('#m_root_Loader').attr('hidden', true);
  $('#m.m_outerScreen').attr('hidden', false);
  $('.stateIndicator').attr('hidden',false);
  dr_readyCallback();

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
  if (target=="Final") // Final 넘어갈때 table data 교체
    makeFinalTable();
  SwitchHelp(0); // Step 넘어갈때마다 Help창 끔
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

function moveHome(what){
  $(what).blur();

  $('.ui.modal#m_homeConfirm')
  .modal({
    closable: true,
    blurring: true,
    onApprove : function(){
      $(".goToNextStage").addClass('loading');
      window.location.href="./index.html";

      setTimeout(function(){$(".goToNextStage").removeClass('loading')}, 500);
      return true;
    }
  })
  .modal('show');

}

function theend(){
  alert("User Testing에 참가해 주셔서 감사합니다. Task가 완료되었습니다.\n결제 기능은 아직 구현되지 않았습니다. 첫 화면으로 돌아가 주십시오.");
  moveHome();
}

function SwitchHelp(n){
  if(current_help !== null){
    $(current_help).stop(true, true).hide();
  }
  if(n==0){
    current_help = null;
    return;
  }
  var next_help = document.getElementById(help_ids[n-1])
  if(current_help == next_help){
    current_help.style.display = "";
    return;
  }
  current_help = next_help;
    $(current_help).stop(true, true).show( "highlight", {color:"#C8BFE7"}, 300 );


  if (n==1){
    document.getElementById("h_RAM_video").src = "https://www.youtube.com/embed/h-P5NgeeJ34?autoplay=1&mute=1&loop=1&playlist=h-P5NgeeJ34";
    document.getElementById("h_frame_video").src = "";
  }

  else if (n==4){
    document.getElementById("h_RAM_video").src = "";
    document.getElementById("h_frame_video").src = "https://www.youtube.com/embed/IrK5cDU9AIA?autoplay=1&mute=1&loop=1&playlist=IrK5cDU9AIA";
  }
  else{
    document.getElementById("h_RAM_video").src = "";
    document.getElementById("h_frame_video").src = "";
  }
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


    var tempHTML = cardHTML.replace(/00/g,("0" + i.toString()).slice (-2));
    tempHTML = tempHTML.replace(/__id__/, ("0" + i.toString()).slice(-2));
    //console.log(tempHTML);

    // DB 불러와서 각 ID에 맞게 수정
    tempHTML = tempHTML.replace(/__link__/, db_CASE[i].link);
    tempHTML = tempHTML.replace(/__img__/, './img/case/'+i+'-min.jpg');
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

  document.getElementById("f_CPU_img").src = encodeURI("img/CPU/"+ composition.CPU +".jpg");
  document.getElementById("f_CPU_name").innerHTML = db_CPU[composition.CPU]["name"];
  document.getElementById("f_CPU_detail").href = db_CPU[composition.CPU]["link"];
  document.getElementById("f_CPU_price").innerHTML = "\\ " + db_CPU[composition.CPU]["price"].toLocaleString('en');

  document.getElementById("f_mainboard_img").src = "img/MB/"+ composition.MB +".jpg";
  document.getElementById("f_mainboard_name").innerHTML = db_MB[composition.MB]["name"];
  document.getElementById("f_mainboard_detail").href = db_MB[composition.MB]["link"];
  document.getElementById("f_mainboard_price").innerHTML = "\\ " + db_MB[composition.MB]["price"].toLocaleString('en');

  document.getElementById("f_GPU_img").src = "img/GPU/"+ composition.GPU +".jpg";
  document.getElementById("f_GPU_name").innerHTML = db_GPU[composition.GPU]["name"];
  document.getElementById("f_GPU_detail").href = db_GPU[composition.GPU]["link"];
  document.getElementById("f_GPU_price").innerHTML = "\\ " + db_GPU[composition.GPU]["price"].toLocaleString('en');

  var RAMidx = 0;
  if(composition.RAM==true){
    RAMidx=1
  }
  document.getElementById("f_RAM_img").src = "img/RAM.jpg";
  document.getElementById("f_RAM_name").innerHTML = db_RAM[RAMidx]["name"];
  document.getElementById("f_RAM_detail").href = db_RAM[RAMidx]["link"];
  document.getElementById("f_RAM_price").innerHTML = "\\ " + db_RAM[RAMidx]["price"].toLocaleString('en');

  var SSDidx = 0;
  if(composition.SSD==true){
    SSDidx=1
  }
  document.getElementById("f_SSD_img").src = "img/SSD.jpg";
  document.getElementById("f_SSD_name").innerHTML = db_SSD[SSDidx]["name"];
  document.getElementById("f_SSD_detail").href = db_SSD[SSDidx]["link"];
  document.getElementById("f_SSD_price").innerHTML = "\\ " + db_SSD[SSDidx]["price"].toLocaleString('en');

  if(composition.HDD==true){
    document.getElementById("f_HDD_card").style.display=""
  document.getElementById("f_HDD_name").innerHTML = db_HDD[1]["name"];
  document.getElementById("f_HDD_detail").href = db_HDD[1]["link"];
  document.getElementById("f_HDD_price").innerHTML = "\\ " + db_HDD[1]["price"].toLocaleString('en');
  }
  else{
    document.getElementById("f_HDD_card").style.display="none"
    document.getElementById("f_HDD_name").innerHTML = db_HDD[0]["name"];
    document.getElementById("f_HDD_price").innerHTML = "\\ " + db_HDD[0]["price"].toLocaleString('en');
  }

  document.getElementById("f_case_img").src = "case/"+ composition.CASE +".jpg";
  document.getElementById("f_case_name").innerHTML = db_CASE[composition.CASE]["name"];
  document.getElementById("f_case_detail").href = db_CASE[composition.CASE]["link"];
  document.getElementById("f_case_price").innerHTML = "\\ " + db_CASE[composition.CASE]["price"].toLocaleString('en');


  document.getElementById("f_power_img").src = "img/PSU/"+ composition.PSU +".jpg";
  document.getElementById("f_power_name").innerHTML = db_PSU[composition.PSU]["name"];
  document.getElementById("f_power_detail").href = db_PSU[composition.PSU]["link"];
  document.getElementById("f_power_price").innerHTML = "\\ " + db_PSU[composition.PSU]["price"].toLocaleString('en');


  document.getElementById("f_final_price").innerHTML = "\\ " + composition.price.toLocaleString('en');
}

function myCompositions(){
  $('#m_myCompositions').blur();
  alert('3개의 task와 무관해 구현하지 않은 기능입니다. 죄송합니다.');

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
  <div id="m_button_case00" onmouseover="casehover(00);" onmouseout="pricebar_hoverend();" onclick="selectCase(__id__,this);" class="ui bottom inverted violet attached button texts">\
    <div id="m_pricetext_case00">\
      <i id="m_cart_case00" class="shopping cart icon __color__"></i>\
      <strong id="m_price_case00" class="texts __color__">__price__</strong>\
    </div>\
    <div hidden id="m_selected_case00">\
      선택됨\
    </div>\
  </div>\
</div>'
