var options = {
    simulator_size: 'mittel',
    socket_io: true,
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
