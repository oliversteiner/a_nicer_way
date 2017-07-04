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
    // Editor
    dataTreeService = new DataTreeService();
    aNWEditor = new AnwEditor();
    aNWEditor.start();
    panels.details.show();
});
