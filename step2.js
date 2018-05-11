var dr_cpuDataTable;
var dr_gpuDataTable;
var dr_gpuTable;
var dr_cpuTable;
var dr_selectedCPU = 3; //외부와의 sync 필요
var dr_selectedGPU = 3;
var dr_readyCallback = function(data){
  var i;
  dr_gpuTable = $('#dr_gpuDataTables');
  dr_cpuTable = $('#dr_cpuDataTables');
    dr_gpuDataTable = dr_gpuTable.DataTable({
        "scrollY" : "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo" : false,
        "order": [[2, 'desc']],
      "createdRow": function( row, data, dataIndex ){
        var dr_price = $(row).find(".dr_priceButton")[0];
        dr_price.setAttribute("name", dr_price.innerText);
        dr_price.setAttribute("onclick", "dr_gpuOnClick(this)");
        dr_price.innerHTML = "<i class=\"fas fa-plus\"></i><i class=\"fas fa-won-sign\"></i>" + parseInt(dr_price.innerText).toLocaleString();
        var efficient =Math.round(10000*parseInt(data[3])/parseInt(db_gpu[dr_selectedGPU][3]))/100;
        $(row).css("background-size", ((Math.log2(efficient))*600-3750) + "px 50px", "");
        $('td', row).eq(3)[0].innerText = efficient + "%";
      },
        "columns": [
            {"width": "50px", "orderable": false, "className": "dr_gpu_1"},
            {"width": "115px", "orderable": false, "className": "dr_gpu_2"},
            {"width": "80px", "className": "dr_gpu_3"},
            {"width": "80px", "className": "dr_gpu_4"},
            {"width": "100px", "className": "dr_gpu_5"}
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
        dr_price.innerHTML = "<i class=\"fas fa-plus\"></i><i class=\"fas fa-won-sign\"></i>" + parseInt(dr_price.innerText).toLocaleString();
        var efficient =Math.round(10000*parseInt(data[3])/parseInt(db_cpu[dr_selectedCPU][3]))/100;
        $(row).css("background-size", ((Math.log2(efficient))*600-3750) + "px 50px", "");
        $('td', row).eq(3)[0].innerText = efficient + "%";
      },
        "columns": [
            {"width": "50px", "orderable": false, "className": "dr_cpu_1"},
            {"width": "115px", "orderable": false, "className": "dr_cpu_2"},
            {"width": "85px", "className": "dr_cpu_3"},
            {"width": "85px", "className": "dr_cpu_4"},
            {"width": "100px", "className": "dr_cpu_5"}
        ]
    });

  for(i=dr_selectedGPU;i<8;i++) dr_gpuDataTable.row.add(db_gpu[i]).draw(false);
  for(i=dr_selectedCPU;i<8;i++) dr_cpuDataTable.row.add(db_cpu[i]).draw(false);

  dr_gpuTable.find('tbody').on('click', 'tr', function(){
    var data = dr_gpuDataTable.row(this).data();
    // console.log(data);
  });
  dr_cpuTable.find('tbody').on('click', 'tr', function(){
    var data = dr_cpuDataTable.row(this).data();
    // console.log(data);
  });
};

$(document).ready(function(){
  dr_readyCallback();
});

var dr_cpuOnClick = function(e){
  var current_price = e.getAttribute("name");
  var dr_cpuObj = $(".dr_cpu_5 .dr_priceButton");
  var calculate_price;
  for(var i=0;i<dr_cpuObj.length;i++){
    calculate_price = (dr_cpuObj[i].getAttribute("name") - current_price);
    if(calculate_price > 0) dr_cpuObj[i].innerHTML = "<i class=\"fas fa-plus\"></i><i class=\"fas fa-won-sign\"></i>" + calculate_price.toLocaleString();
    else if(calculate_price === 0) dr_cpuObj[i].innerText = "선택됨";
    else dr_cpuObj[i].innerHTML = "<i class=\"fas fa-minus\"></i><i class=\"fas fa-won-sign\"></i>" + (-calculate_price).toLocaleString();
  }
  $("#s_CPU").effect( "highlight", {color:"#C8BFE7"}, 300 );
  $("#s_FPS").effect( "highlight", {color:"#C8BFE7"}, 300 );
};

var dr_gpuOnClick = function(e){
  var current_price = e.getAttribute("name");
  var dr_gpuObj = $(".dr_gpu_5 .dr_priceButton");
  var calculate_price;
  for(var i=0;i<dr_gpuObj.length;i++){
    calculate_price = (dr_gpuObj[i].getAttribute("name") - current_price);
    if(calculate_price > 0) dr_gpuObj[i].innerHTML = "<i class=\"fas fa-plus\"></i><i class=\"fas fa-won-sign\"></i>" + calculate_price.toLocaleString();
    else if(calculate_price === 0) dr_gpuObj[i].innerText = "선택됨";
    else dr_gpuObj[i].innerHTML = "<i class=\"fas fa-minus\"></i><i class=\"fas fa-won-sign\"></i>" + (-calculate_price).toLocaleString();
  }
  $("#s_FPS").effect( "highlight", {color:"#C8BFE7"}, 300 );
};
