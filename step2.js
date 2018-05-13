var dr_cpuDataTable;
var dr_gpuDataTable;
var dr_gpuTable;
var dr_cpuTable;
var dr_selectedCPU = 3; //외부와의 sync 필요
var dr_selectedGPU = 3;
var dr_defaultCPU = 0;
var dr_defaultGPU = 0;
var dr_init_CPU;
var dr_init_GPU;
var dr_readyCallback = function (data) {
     dr_selectedCPU = composition.CPU;
     dr_selectedGPU = composition.GPU;
     dr_defaultGPU = composition.showGPUIdx;
     dr_defaultCPU = composition.showCPUIdx;


     var isSimplemode = true;

     if(dr_selectedCPU == -1 && dr_selectedGPU == -1){
       dr_selectedCPU = dr_defaultCPU;
       dr_selectedGPU = dr_defaultGPU;
       isSimplemode = false;
     }


    dr_gpuTable = $('#dr_gpuDataTables');
    dr_cpuTable = $('#dr_cpuDataTables');
    dr_gpuDataTable = dr_gpuTable.DataTable({
        "scrollY": "520px",
        "scrollX": false,
        "scrollCollapse": false,
        "paging": false,
        "searching": false,
        "bInfo": false,
        "order": [[2, 'desc']],
        "createdRow": function (row, data, dataIndex) {
            var dr_price = $(row).find(".dr_priceButton")[0];
            if (dr_selectedGPU - dr_defaultGPU === dataIndex) dr_init_GPU = dr_price;
            dr_price.setAttribute("name", dr_price.innerText);
            dr_price.setAttribute("onclick", "dr_gpuOnClick(this)");
            //dr_price.setAttribute("onmouseover", "modeButtonHoverHandler(this)");
            dr_price.setAttribute("onmouseout", "modeButtonHoverEndHandler(this)");
            dr_price.innerHTML = "+\\" + parseInt(dr_price.innerText).toLocaleString();
            var efficient = Math.round(parseInt(data[3]) / 3 - 135);
            $(row).css("background-size", efficient + "px 50px", "");
            $(row).find('.dr_dimmable').dimmer({on: 'hover'});
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
        "scrollY": "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo": false,
        "order": [[2, 'desc']],
        "createdRow": function (row, data, dataIndex) {
            var dr_price = $(row).find(".dr_priceButton")[0];
            if (dr_selectedCPU - dr_defaultCPU === dataIndex) dr_init_CPU = dr_price;
            dr_price.setAttribute("name", dr_price.innerText);
            dr_price.setAttribute("onclick", "dr_cpuOnClick(this)");
            //dr_price.setAttribute("onmouseover", "modeButtonHoverHandler(this)");
            dr_price.setAttribute("onmouseout", "modeButtonHoverEndHandler(this)");
            dr_price.innerHTML = "+\\" + parseInt(dr_price.innerText).toLocaleString();
            var efficient = Math.round(1.15 * parseInt(data[3]) + 20);
            $(row).css("background-size", efficient + "px 50px", "");
            $(row).find('.dr_dimmable').dimmer({on: 'hover'});
        },
        "columns": [
            {"orderable": false, "className": "dr_cpu_1"},
            {"orderable": false, "className": "dr_cpu_2"},
            {"className": "dr_cpu_3"},
            {"className": "dr_cpu_4"},
            {"className": "dr_cpu_5"}
        ]
    });
    var i = dr_defaultGPU;
    for (; i < 8; i++) dr_gpuDataTable.row.add(["<div class='dr_dimmable'><div class='ui dimmer'><div class='content'><div class='center'><div class='ui inverted button'><i class='icon external alternate'></i></div></div></div></div>" + dbr_gpu[i][0], dbr_gpu[i][1], dbr_gpu[i][2], dbr_gpu[i][3], dbr_gpu[i][4]]).draw(false);
    for (i = dr_defaultCPU; i < 8; i++) dr_cpuDataTable.row.add(["<div class='dr_dimmable'><div class='ui dimmer'><div class='content'><div class='center'><div class='ui inverted button'><i class='icon external alternate'></i></div></div></div></div>" + dbr_cpu[i][0], dbr_cpu[i][1], dbr_cpu[i][2], dbr_cpu[i][3], dbr_cpu[i][4]]).draw(false);

    if(!isSimplemode){
      dr_cpuInit(dr_init_CPU, dr_defaultCPU);
      dr_gpuInit(dr_init_GPU, dr_defaultGPU);
    }else{
      dr_cpuOnClick(dr_init_CPU);
      dr_gpuOnClick(dr_init_GPU);
    }
};


var dr_cpuOnClick = function (e) {
    $("#dr_cpuDataTables_wrapper").find(".inverted").removeClass('active');
    $(e).removeClass('basic');
    $(e).addClass('inverted active');
    var current_row = dr_cpuDataTable.row(e.parentNode.parentNode)[0];
    dr_selectedCPU = parseInt(current_row) + dr_defaultCPU;

    var current_price = e.getAttribute("name");
    var dr_cpuObj = $(".dr_cpu_5 .dr_priceButton");
    var calculate_price;
    for (var i = 0; i < dr_cpuObj.length; i++) {
        calculate_price = (dr_cpuObj[i].getAttribute("name") - current_price);
        if (calculate_price > 0) {
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
            dr_cpuObj[i].className += " expensive";
            dr_cpuObj[i].innerHTML = "+\\" + calculate_price.toLocaleString();
        }
        else if (calculate_price === 0) {
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
            dr_cpuObj[i].innerText = "선택됨";
        }
        else {
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
            dr_cpuObj[i].className += " cheap";
            dr_cpuObj[i].innerHTML = "-\\" + (-calculate_price).toLocaleString();
        }
    }
    composition.set("CPU", dr_selectedCPU);
    if (dr_selectedCPU === 0) composition.set("MB", 0);
    else if (dr_selectedCPU % 2 === 1) composition.set("MB", 1);
    else composition.set("MB", 2);
    setSpecIndicator('CPU', parseInt(dbr_cpu[dr_selectedCPU][3]));
    setSpecIndicator('FPS', Math.min(parseInt(dbr_cpu[dr_selectedCPU][2]), parseInt(dbr_gpu[dr_selectedGPU][2])));
};

var dr_gpuOnClick = function (e) {
    $("#dr_gpuDataTables_wrapper").find(".inverted").removeClass('active');
    $(e).removeClass('basic');
    $(e).addClass('inverted active');
    var current_row = dr_gpuDataTable.row(e.parentNode.parentNode)[0];
    dr_selectedGPU = parseInt(current_row) + dr_defaultGPU;
    var current_price = e.getAttribute("name");
    var dr_gpuObj = $(".dr_gpu_5 .dr_priceButton");
    var calculate_price;
    for (var i = 0; i < dr_gpuObj.length; i++) {
        calculate_price = (dr_gpuObj[i].getAttribute("name") - current_price);
        if (calculate_price > 0) {
            dr_gpuObj[i].className = dr_gpuObj[i].className.replace(' cheap', '');
            dr_gpuObj[i].className = dr_gpuObj[i].className.replace(' expensive', '');
            dr_gpuObj[i].className += " expensive";
            dr_gpuObj[i].innerHTML = "+\\" + calculate_price.toLocaleString();
        }
        else if (calculate_price === 0) {
            dr_gpuObj[i].className = dr_gpuObj[i].className.replace(' cheap', '');
            dr_gpuObj[i].className = dr_gpuObj[i].className.replace(' expensive', '');
            dr_gpuObj[i].innerText = "선택됨";
        }
        else {
            dr_gpuObj[i].className = dr_gpuObj[i].className.replace(' cheap', '');
            dr_gpuObj[i].className = dr_gpuObj[i].className.replace(' expensive', '');
            dr_gpuObj[i].className += " cheap";
            dr_gpuObj[i].innerHTML = "-\\" + (-calculate_price).toLocaleString();
        }
    }
    composition.set("GPU", dr_selectedGPU);
    setSpecIndicator('FPS', Math.min(parseInt(dbr_cpu[dr_selectedCPU][2]), parseInt(dbr_gpu[dr_selectedGPU][2])));

};

var dr_cpuInit = function (e, mode) {
    if (mode === -1) { //simple mode
        $("#dr_cpuDataTables_wrapper").find(".inverted").removeClass('active');
        $(e).removeClass('basic');
        $(e).addClass('inverted active');
    }
    var current_row = dr_cpuDataTable.row(e.parentNode.parentNode)[0];
    dr_selectedCPU = parseInt(current_row) + dr_defaultCPU;
    var current_price = e.getAttribute("name");
    var dr_cpuObj = $(".dr_cpu_5 .dr_priceButton");
    var calculate_price;
    for (var i = 0; i < dr_cpuObj.length; i++) {
        calculate_price = (dr_cpuObj[i].getAttribute("name") - current_price);
        if (calculate_price > 0) {
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
            dr_cpuObj[i].className += " expensive";
            dr_cpuObj[i].innerHTML = "+\\" + calculate_price.toLocaleString();
        }
        else if (calculate_price === 0) {
            if (mode === -1) {
                dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
                dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
                dr_cpuObj[i].innerText = "선택됨";
            }
            else {
                dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
                dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
                dr_cpuObj[i].className += " cheap";
                dr_cpuObj[i].innerText = "+\\0";
            }
        }
        else {
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' cheap', '');
            dr_cpuObj[i].className = dr_cpuObj[i].className.replace(' expensive', '');
            dr_cpuObj[i].className += " cheap";
            dr_cpuObj[i].innerHTML = "-\\" + (-calculate_price).toLocaleString();
        }
    }
    setSpecIndicator('CPU', parseInt(dbr_cpu[dr_selectedCPU][3]));
    setSpecIndicator('FPS', Math.min(parseInt(dbr_cpu[dr_selectedCPU][2]), parseInt(dbr_gpu[dr_selectedGPU][2])));
};

var dr_gpuInit = function (e, mode) {
    if (mode === -1) { //simple mode
        $("#dr_gpuDataTables_wrapper").find(".inverted").removeClass('active');
        $(e).removeClass('basic');
        $(e).addClass('inverted active');
    }
    var current_row = dr_gpuDataTable.row(e.parentNode.parentNode)[0];
    dr_selectedGPU = parseInt(current_row) + dr_defaultGPU;
    var current_price = e.getAttribute("name");
    var dr_gpuObj = $(".dr_gpu_5 .dr_priceButton");
    var calculate_price;
    for (var i = 0; i < dr_gpuObj.length; i++) {
        calculate_price = (dr_gpuObj[i].getAttribute("name") - current_price);
        if (calculate_price > 0) {
            dr_gpuObj[i].className.replace(' cheap', '');
            dr_gpuObj[i].className.replace(' expensive', '');
            dr_gpuObj[i].className += " expensive";
            dr_gpuObj[i].innerHTML = "+\\" + calculate_price.toLocaleString();
        }
        else if (calculate_price === 0) {
            if (mode === -1) {
                dr_gpuObj[i].className.replace(' cheap', '');
                dr_gpuObj[i].className.replace(' expensive', '');
                dr_gpuObj[i].innerText = "선택됨";
            }
            else {
                dr_gpuObj[i].className.replace(' cheap', '');
                dr_gpuObj[i].className.replace(' expensive', '');
                dr_gpuObj[i].className += " cheap";
                dr_gpuObj[i].innerText = "+\\0";
            }
        }
        else {
            dr_gpuObj[i].className.replace(' cheap', '');
            dr_gpuObj[i].className.replace(' expensive', '');
            dr_gpuObj[i].className += " cheap";
            dr_gpuObj[i].innerHTML = "-\\" + (-calculate_price).toLocaleString();
        }
    }
    setSpecIndicator('FPS', Math.min(parseInt(dbr_cpu[dr_selectedCPU][2]), parseInt(dbr_gpu[dr_selectedGPU][2])));
};

function GPU_hover(id, isGPU, idx){

  if(! $(id).hasClass('active')){
    $(id).removeClass('inverted');
    $(id).addClass('basic');
  }

  var current;
  var increament;
  if(isGPU){
    current = composition.GPU == -1 ? composition.showGPUIdx : composition.GPU;
    increament = db_GPU[idx].price - db_GPU[current].price;
  }else{
    current = composition.CPU == -1 ? composition.showCPUIdx : composition.CPU;
    increament = db_CPUandMB[idx] - db_CPUandMB[current];
  }
  pricebar_hoverstart(increament);
}
