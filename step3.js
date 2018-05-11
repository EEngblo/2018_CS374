var help_ids = ["h_RAM", "h_storage_check", "h_storage", "h_frame", "h_GPU_score", "h_CPU_score"]
var step_ids = ["d_root_GPUCPU", "d_root_RAMandSto", "d_root_Case","segmantWrapper"]
var current_help = null;
var current_step = null;
var b_home_button = document.getElementById("b_home_button");
var b_performace_button = document.getElementById("b_performace_button");
var b_versatility_button = document.getElementById("b_versatility_button");
var b_case_button = document.getElementById("b_case_button");
var b_final_button = document.getElementById("b_final_button");

$( document ).ready(function() {
});

window.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  var num;
  switch (event.keyCode) {
  	case 48: //0
      SwitchHelp(0)
      break;
    case 49: //1
      SwitchHelp(1)
      break;
    case 50: //2
      SwitchHelp(2)
      break;
    case 51: //3
   	  SwitchHelp(3)
      break;
    case 52: //4
      SwitchHelp(4)
      break;
    case 53: //5
      SwitchHelp(5)
      break;
    case 54: //6
      SwitchHelp(6)
      break;
    default:
      return;
  }
});

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

function SwitchStep(n){
  if (current_step != null)
    current_step.style.display = "none";
  current_step = document.getElementById(step_ids[n])
  current_step.style.display = "";
}

