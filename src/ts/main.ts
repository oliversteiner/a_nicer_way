declare let aNicerWay: any;

// Service
declare let hypeService: any;
declare let pouchDBService: any;
declare let socketIOService: any;
declare let socketSimulatorService: any;
declare let dataTreeService: any;


// Editor
declare let aNWEditor: any;

// Panels
declare  let panels: any;

// others
declare let _scroll_direction: string;


let options = {
    simulator_size: 'mittel', // voll, halb, klein, mittel, gross
    socket_io: true, // if the server is not an node.js, socketIO is not aviable.
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

    // Editor
    dataTreeService = new DataTreeService();
    aNWEditor = new AnwEditor();
    aNWEditor.start();

    // ------- Start Debug
    SmartphoneSimController.close();
    // ------- End Debug


    // toggle
    $('.tumbnails-area-toggle-button-2').click(function () {
        // editor modus

        $('#editor').toggle();
        $('boby').toggleClass('editor-active');
        EditorSlidesController.toggle();


    });

});