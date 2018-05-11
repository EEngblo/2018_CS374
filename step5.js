function SwitchPlusMinus(r){
  var classes = r.className;
  if(r.id=="f_table_CPU"){
    if(classes.includes("collapsed")){
    document.getElementById("f_CPU_plus").style.display="none";
    document.getElementById("f_CPU_minus").style.display="";
    }
    else{
      document.getElementById("f_CPU_plus").style.display="";
      document.getElementById("f_CPU_minus").style.display="none";
    }
  }
  else if(r.id=="f_table_case"){
    if(classes.includes("collapsed")){
    document.getElementById("f_case_plus").style.display="none";
    document.getElementById("f_case_minus").style.display="";
    }
    else{
      document.getElementById("f_case_plus").style.display="";
      document.getElementById("f_case_minus").style.display="none";
    }
  }
}