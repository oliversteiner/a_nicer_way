var options = {
    simulator_size: 'mittel',
    socket_io: false,
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
