$('#accordion1').on('shown.bs.collapse', function () {
    $("#package1 i.indicator").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
});
$('#accordion1').on('hidden.bs.collapse', function () {
    $("#package1 i.indicator").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});

$('#accordion2').on('shown.bs.collapse', function () {
    $("#package2 i.indicator").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
});
$('#accordion2').on('hidden.bs.collapse', function () {
    $("#package2 i.indicator").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});