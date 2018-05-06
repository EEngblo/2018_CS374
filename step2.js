$(document).ready(function(){
    $('#gpuDataTables').DataTable({
        "scrollY" : "470px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo" : false
    });
    $('#cpuDataTables').DataTable({
        "scrollY" : "470px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "bInfo": false
    });
});