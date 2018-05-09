var dr_cpuDataTable;
var dr_gpuDataTable;
var dr_gpuTable;
var dr_cpuTable;
var dr_readyCallback = function(data){
    console.log("callback");
    dr_gpuTable = $('#dr_gpuDataTables');
    dr_gpuDataTable = dr_gpuTable.DataTable({
        "scrollY" : "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo" : false,
        "order": [[2, 'desc']],
        "columns": [
            {"width": "50px", "orderable": false},
            {"width": "180px", "orderable": false},
            {"width": "80px"},
            {"width": "80px"},
            {"width": "80px"}
        ]
    });
    dr_cpuDataTable = $('#dr_cpuDataTables').DataTable({
        "scrollY" : "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo": false,
        "order": [[2, 'desc']],
        "columns": [
            {"width": "50px", "orderable": false},
            {"width": "180px", "orderable": false},
            {"width": "80px"},
            {"width": "80px"},
            {"width": "80px"}
        ]
    });

    for(var i=0;i<8;i++){
        dr_cpuDataTable.row.add([
            "<img src=\"img/CPU/0.jpg\" class=\"dr_itemImage\">",
            "라이젠 3 2200G",
            "56",
            "16000",
            "\\100000"
        ]).draw(false);
        dr_gpuDataTable.row.add([
            "<img src=\"img/GPU/"+ i +".jpg\" class=\"dr_itemImage\">",
            "<p>GTX1050Ti</p><p class=\"dr_align_right\">ZOTAC 4GB</p>",
            56 + i + "",
            "16000",
            "\\100000"
        ]).draw(false);
    }
    dr_gpuTable.find('tbody').on('click', 'tr', function(){
        var data = dr_gpuDataTable.row(this).data();
        console.log(data);
    });
};

$(document).ready(function(){
  dr_readyCallback();
});