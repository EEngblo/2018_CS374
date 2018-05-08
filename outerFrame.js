var b_loadInnerContents = function(t){
  switch (t){
    case 1:{
      $("#m_mainContentsCell").load("step2.html");
      break;
    }
    case 2:{
      break;
    }
    case 3:{
      if(!document.getElementById("b_case_button").hasClass("disabled")){
        m_nextContents();
      }
      break;
    }
    case 4:{
      if(!document.getElementById("b_final_button").hasClass("disabled")){
        m_nextContents();
      }
      break;
    }
    case 0:{
      if(confirm("현재 작성 중인 견적이 사라지게 됩니다.\n정말 이동하시겠습니까?")){
        location.href="index.html";
      }
      break;
    }
  }
};

var m_nextContents = function(){

};