declare let aNicerWay:any;
declare let hypeService:any;
declare let pouchDBService:any;
declare let socketIOService:any;
declare let socketSimulatorService:any;


let options = {
    simulator_size: 'mittel', // voll, halb, klein, mittel, gross
    socket_io: false, // if the server is not an node.js, socketIO is not aviable.
    check_for_mobile: false // true, false
};


$(document).ready(function () {
    aNicerWay = new ANicerWay(options);
    aNicerWay.start();


    // Services:
    hypeService = new HypeService();
    pouchDBService = new PouchDBService();
    socketSimulatorService = new SocketSimulatorService();

    socketIOService = new SocketIOService();


    //
    aNicerWay.displayController.remote.show();


});


