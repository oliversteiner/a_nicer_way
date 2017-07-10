var options = {
    simulator_size: 'mittel',
    socket_io: true,
    check_for_mobile: false // true, false
};
$(document).ready(function () {
    // A Nicer Way
    aNicerWay = new ANicerWay(options);
    aNicerWay.start();
    // Services:
    socketIOService = new SocketIOService(true);
    hypeService = new HypeService();
    pouchDBService = new PouchDBService();
    socketSimulatorService = new SocketSimulatorService();
    panels = new PanelController();
    dataTreeService = new DataTreeService();
    aNWEditor = new AnwEditor();
    aNWEditor.start();
    // toggle
    $('.tumbnails-area-toggle-button-2').click(function () {
        // editor modus
        $('#editor').toggle();
        $('boby').toggleClass('editor-active');
        EditorSlidesController.toggle();
    });
});
dataTreeService = new DataTreeService();
aNWEditor = new AnwEditor();
aNWEditor.start();
// toggle
$('.tumbnails-area-toggle-button-2').click(function () {
    // editor modus
    $('#editor').toggle();
    $('boby').toggleClass('editor-active');
    EditorSlidesController.toggle();
});
;
$(function () {
    // https://jsfiddle.net/ZzaichikK/MUvsG/
    // show hide subnav depending on scroll direction
    var position = $(window).scrollLeft();
    $(window).scroll(function () {
        var scroll = $(window).scrollLeft();
        if (scroll > position) {
            scroll_direction = "right";
        }
        else {
            scroll_direction = "left";
        }
        position = scroll;
    });
});
