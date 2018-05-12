var dr_cpuDataTable;
var dr_gpuDataTable;
var dr_gpuTable;
var dr_cpuTable;
var dr_selectedCPU = 3; //외부와의 sync 필요
var dr_selectedGPU = 3;
var dr_defaultCPU = 3;
var dr_defaultGPU = 3;
var dr_readyCallback = function(data){
  var i;
  dr_gpuTable = $('#dr_gpuDataTables');
  dr_cpuTable = $('#dr_cpuDataTables');
    dr_gpuDataTable = dr_gpuTable.DataTable({
        "scrollY" : "520px",
        "scrollX": false,
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo" : false,
        "order": [[2, 'desc']],
      "createdRow": function( row, data, dataIndex ){
        var dr_price = $(row).find(".dr_priceButton")[0];
        dr_price.setAttribute("name", dr_price.innerText);
          dr_price.setAttribute("onclick", "dr_gpuOnClick(this)");
          dr_price.setAttribute("onmouseover", "modeButtonHoverHandler(this)");
          dr_price.setAttribute("onmouseout", "modeButtonHoverEndHandler(this)");
        dr_price.innerHTML = "+\\" + parseInt(dr_price.innerText).toLocaleString();
        var efficient =Math.round(parseInt(data[3])/20 - 400);
        $(row).css("background-size", efficient + "px 50px", "");
      },
        "columns": [
            {"orderable": false, "className": "dr_gpu_1"},
            {"orderable": false, "className": "dr_gpu_2"},
            {"className": "dr_gpu_3"},
            {"className": "dr_gpu_4"},
            {"className": "dr_gpu_5"}
        ]
    });
    dr_cpuDataTable = dr_cpuTable.DataTable({
        "scrollY" : "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo": false,
        "order": [[2, 'desc']],
      "createdRow": function( row, data, dataIndex ){
        var dr_price = $(row).find(".dr_priceButton")[0];
        dr_price.setAttribute("name", dr_price.innerText);
        dr_price.setAttribute("onclick", "dr_cpuOnClick(this)");
          dr_price.setAttribute("onmouseover", "modeButtonHoverHandler(this)");
          dr_price.setAttribute("onmouseout", "modeButtonHoverEndHandler(this)");
        dr_price.innerHTML = "+\\" + parseInt(dr_price.innerText).toLocaleString();
        var efficient =Math.round(1.15*parseInt(data[3]) + 20);
        $(row).css("background-size", efficient + "px 50px", "");
      },
        "columns": [
            {"orderable": false, "className": "dr_cpu_1"},
            {"orderable": false, "className": "dr_cpu_2"},
            {"className": "dr_cpu_3"},
            {"className": "dr_cpu_4"},
            {"className": "dr_cpu_5"}
        ]
    });

};

$(document).ready(function(){
  dr_readyCallback();
});

var dr_cpuOnClick = function(e){
  $("#dr_cpuDataTables_wrapper").find(".inverted").removeClass('active');
  $(e).removeClass('basic');
  $(e).addClass('inverted active');
    var current_row = dr_cpuDataTable.row(e.parentNode.parentNode)[0];
    dr_selectedCPU = parseInt(current_row) + dr_defaultCPU;
  var current_price = e.getAttribute("name");
  var dr_cpuObj = $(".dr_cpu_5 .dr_priceButton");
  var calculate_price;
  for(var i=0;i<dr_cpuObj.length;i++){
    calculate_price = (dr_cpuObj[i].getAttribute("name") - current_price);
    if(calculate_price > 0) dr_cpuObj[i].innerHTML = "+\\" + calculate_price.toLocaleString();
    else if(calculate_price === 0) dr_cpuObj[i].innerText = "선택됨";
    else dr_cpuObj[i].innerHTML = "-\\" + (-calculate_price).toLocaleString();
  }

  setSpecIndicator('CPU', parseInt(db_cpu[dr_selectedCPU][3]));
  setSpecIndicator('FPS', Math.min(parseInt(db_cpu[dr_selectedCPU][2]), parseInt(db_gpu[dr_selectedGPU][2])));

};

var dr_gpuOnClick = function(e){
  $("#dr_gpuDataTables_wrapper").find(".inverted").removeClass('active');
  $(e).removeClass('basic');
  $(e).addClass('inverted active');
  var current_row = dr_gpuDataTable.row(e.parentNode.parentNode)[0];
  dr_selectedGPU = parseInt(current_row) + dr_defaultGPU;
  var current_price = e.getAttribute("name");
  var dr_gpuObj = $(".dr_gpu_5 .dr_priceButton");
  var calculate_price;
  for(var i=0;i<dr_gpuObj.length;i++){
    calculate_price = (dr_gpuObj[i].getAttribute("name") - current_price);
    if(calculate_price > 0) dr_gpuObj[i].innerHTML = "+\\" + calculate_price.toLocaleString();
    else if(calculate_price === 0) dr_gpuObj[i].innerText = "선택됨";
    else dr_gpuObj[i].innerHTML = "-\\" + (-calculate_price).toLocaleString();
  }

  setSpecIndicator('FPS', Math.min(parseInt(db_cpu[dr_selectedCPU][2]), parseInt(db_gpu[dr_selectedGPU][2])));

};
