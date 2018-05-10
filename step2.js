var dr_cpuDataTable;
var dr_gpuDataTable;
var dr_gpuTable;
var dr_cpuTable;
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
      },
        "columns": [
            {"width": "50px", "orderable": false, "className": "dr_gpu_1"},
            {"width": "180px", "orderable": false, "className": "dr_gpu_2"},
            {"width": "80px", "className": "dr_gpu_3"},
            {"width": "80px", "className": "dr_gpu_4"},
            {"width": "80px", "className": "dr_gpu_5"}
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
        $(row).css("background-size", (50 + data[3]*5) + "px 50px", "");
      },
        "columns": [
            {"width": "50px", "orderable": false, "className": "dr_cpu_1"},
            {"width": "180px", "orderable": false, "className": "dr_cpu_2"},
            {"width": "80px", "className": "dr_cpu_3"},
            {"width": "80px", "className": "dr_cpu_4"},
            {"width": "80px", "className": "dr_cpu_5"}
        ]
    });

    for(var i=0;i<8;i++){
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