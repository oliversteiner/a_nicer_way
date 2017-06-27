declare let aNicerWay:any;
declare let hypeService:any;
declare let pouchDBService:any;
declare let socketIOService:any;
declare let socketSimulatorService:any;


let options = {
    simulator_size: 'mittel', // voll, halb, klein, mittel, gross
    socket_io: true, // if the server is not an node.js, socketIO is not aviable.
    check_for_mobile: true // true, false

};


$(document).ready(function () {

    // A Nicer Way
    aNicerWay = new ANicerWay(options);
    aNicerWay.start();


    // Services:
    hypeService = new HypeService();
    pouchDBService = new PouchDBService();
    socketSimulatorService = new SocketSimulatorService();
    socketIOService = new SocketIOService();


});


