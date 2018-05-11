var dr_cpuDataTable;
var dr_gpuDataTable;
var dr_gpuTable;
var dr_cpuTable;
var selected = 3; //외부와의 sync 필요
var dr_readyCallback = function(data){
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
        $(row).css("background-size", (50 + data[3]*0.02) + "px 50px", "");
        var dr_price = $(row).find(".dr_priceButton")[0];
        dr_price.setAttribute("name", dr_price.innerText);
        dr_price.innerHTML = "<i class=\"fas fa-won-sign\"></i>" + parseInt(dr_price.innerText).toLocaleString();
        var efficient =Math.round(10000*parseInt(data[3])/parseInt(db_gpu[selected][3]))/100;
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
        $(row).css("background-size", (50 + data[2]*4.8) + "px 50px", "");
        var dr_price = $(row).find(".dr_priceButton")[0];
        dr_price.setAttribute("name", dr_price.innerText);
        dr_price.innerHTML = "<i class=\"fas fa-won-sign\"></i>" + parseInt(dr_price.innerText).toLocaleString();
        var efficient =Math.round(10000*parseInt(data[3])/parseInt(db_cpu[selected][3]))/100;
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

    for(var i=selected;i<8;i++){
        dr_cpuDataTable.row.add(db_cpu[i]).draw(false);
        dr_gpuDataTable.row.add(db_gpu[i]).draw(false);
    }
  dr_gpuTable.find('tbody').on('click', 'tr', function(){
    var data = dr_gpuDataTable.row(this).data();
    console.log(data);
  });
  dr_cpuTable.find('tbody').on('click', 'tr', function(){
    var data = dr_cpuDataTable.row(this).data();
    console.log(data);
  });
};

$(document).ready(function(){
  dr_readyCallback();
});