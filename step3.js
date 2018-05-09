var help_ids = ["h_RAM", "h_storage_check", "h_storage", "h_frame", "h_GPU_score", "h_CPU_score"]
var current_help = null;

$( document ).ready(function() {
});

$(document).addEventListener('keydown', function(event) {
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
    case 53 //5
      SwitchHelp(5)
      break;
    case 54 //6
      SwitchHelp(6)
      break;
    default:
      return;
  }
});

function SwitchHelp(n){
	if (current_help != null)
		current_help.style.display = "none";
	if(n==0)
		current_help = null;

	current_help = document.getElementById(help_ids[n-1])
	current_help.style.display = "";
}