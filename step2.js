var dr_cpuDataTable;
var dr_gpuDataTable;



$(document).ready(function(){
    dr_readyCallback();
});

var dr_readyCallback = function(data){
    dr_gpuDataTable = $('#dr_gpuDataTables').DataTable({
        "scrollY" : "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo" : false
    });
    dr_cpuDataTable = $('#dr_cpuDataTables').DataTable({
        "scrollY" : "520px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo": false
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
            "56",
            "16000",
            "\\100000"
        ]).draw(false);
    };
    $('#dr_gpuDataTables tbody').on('click', 'tr', function(){
        var data = dr_gpuDataTable.row(this).data();
        console.log(data);
    });
};