
// 전역변수 선언


var steps = ['Home', 'GPUandCPU', 'RAMandSto', 'Case', 'Final']; // mode(게임성능/활용도)에 따라서 step 결정
var steps_finished = [true, false, false, false, false]; // steps의 각 step이 완료되었는지 저장
var currentStepIdx = 0; // steps 배열에서 몇 번째 step을 진행중인지 표시

var composition;


//////////////////////////////////////////////

// 견적 Class 선언

function Composition(budget, preferMode, isSimpleMode){
  // URL query문에서 각 parameter 받아 옴
  budget = getParameterByName("budget");
  mode1 = getParameterByName("mode1");
  mode2 = getParameterByName("mode2");

  this.CPU = -1;
  this.GPU = -1;


  console.log(budget);
  console.log(mode1);
  console.log(mode2);

  this.RAM = false;
  this.SSD = false; // SSD는 무조건 250G로 추천
  this.HDD = false; // HDD도 무조건 없음으로 추천

  this.CASE = -1;


  // breadcrumb init
  $('#b_root').append(breadcrumbContents[0]);

  // 성능-활용도 모드에 따라서 breadcrumb 순서 변경 및 기본 추천 견적 작성
  if(mode1 === "performanceMode"){
    // 게임 성능 우선 모드
    $('#b_root').append(breadcrumbContents[1]);
    $('#b_root').append(breadcrumbContents[2]);

  }else{
    // 활용도 모드

    // breadcrumb 순서 변경
    temp = steps[1];
    steps[1] = steps[2];
    steps[2] = temp;

    $('#b_root').append(breadcrumbContents[2]);
    $('#b_root').append(breadcrumbContents[1]);


  }

  // breadcrumb 완성
  $('#b_root').append(breadcrumbContents[3]);
  $('#b_root').append(breadcrumbContents[4]);

  if(mode2 === "simpleMode"){
    // 원클릭 모드

    $('#b_GPUandCPU_button').addClass('completed');
    $('#b_RAMandSto_button').addClass('completed');

    steps_finished[1] = true;
    steps_finished[2] = true;

    moveStep('Case');
  }else{
    // 커스텀 모드

    moveStep(steps[1]);
  }
}




//////////////////////////////////


$(document).ready(function(){

  composition = new Composition(1,2,3);



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
