$('#accordion1').on('shown.bs.collapse', function () {
    $("#package1 i.indicator").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
});
$('#accordion1').on('hidden.bs.collapse', function () {
    $("#package1 i.indicator").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
});

$('#accordion2').on('shown.bs.collapse', function () {
    $("#package2 i.indicator").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
});
$('#accordion2').on('hidden.bs.collapse', function () {
    $("#package2 i.indicator").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
});
