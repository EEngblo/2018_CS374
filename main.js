

function Composition(budget, preferMode, isSimpleMode){
  this.CPU = -1;
  this.GPU = -1;
  this.RAM = false;
  this.SSD = false;
  this.HDD = false;
  this.CASE = -1;
  alert();

  // watch method 이용해서 attr 값 바뀔때마다 하면 됨
}

var composition;


//////////////////////////////////

var steps = ['Home', 'GPUandCPU', 'RAMandSto', 'Case', 'Final']; // mode(게임성능/활용도)에 따라서 step 결정
var steps_finished = [true, false, false, false, false]; // steps의 각 step이 완료되었는지 저장
var currentStepIdx = 0; // steps 배열에서 몇 번째 step을 진행중인지 표시


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
