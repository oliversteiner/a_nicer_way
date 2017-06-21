/**
 * Created by ost on 20.06.17.
 */
var SocketController = (function () {
    function SocketController() {
        this.socket = io();
        this.receiveCommand();
        this.receivePing();
        this.receiveMessage();
        this.receiveTimepointId();
    }
    // SEND
    SocketController.prototype.socketSend = function (type, msg) {
        // Nachricht schicken
        this.socket.emit(type, msg);
    };
    SocketController.prototype.sendPing = function () {
        var png = 'PING';
        // Nachricht schicken
        this.socketSend('ping_2', png);
    };
    SocketController.prototype.sendList = function () {
        var list = aNicerWay.getTimeWayPointList();
        // liste schicken
        this.socketSend('timepoint list', list);
    };
    SocketController.prototype.sendTimePointNr = function (nr) {
        this.socketSend('timepoint nr', nr);
    };
    // RECEIVE
    SocketController.prototype.receiveCommand = function () {
        /* steuerbefehl empfangen
         ------------------------------
         -- socket-cmd ----------------
         previous
         next

         navigation-display-toggle
         data-display-toggle
         smartphone-sim-toggle
         console-toggle
         remote-open
         help-toggle
         ------------------------------
         */
        this.socket.on('command', function (cmd) {
            console.log(cmd);
            switch (cmd) {
                case 'previous':
                    aNicerWay.goToPrevious();
                    break;
                case 'next':
                    aNicerWay.goToNext();
                    break;
                case 'first':
                    aNicerWay.goToFirst();
                    break;
                case 'last':
                    aNicerWay.goToLast();
                    break;
                // Toolbar
                case 'navigation-display-toggle':
                    NavigationController.modalToggle();
                    break;
                case 'data-display-toggle':
                    DataDisplayController.modalToggle();
                    break;
                case 'smartphone-sim-toggle':
                    SmartphoneSimController.toggle();
                    break;
                case 'console-toggle':
                    ConsoleController.modalToggle();
                    break;
                case 'remote-toggle':
                    RemoteDisplayController.modalToggle();
                    break;
                case 'help-toggle':
                    HelpController.modalToggle();
                    break;
                case 'get-list':
                    aNicerWay.socketController.sendList();
                    break;
                default:
                    SmartphoneSimController.error('Remotebefehl nicht verstanden');
                    SmartphoneSimController.error('> ' + cmd, 1);
            }
        });
    };
    SocketController.prototype.receivePing = function () {
        // ping_2 empfangen
        this.socket.on('ping_2', function () {
            console.log('PING');
            SmartphoneSimController.ping();
        });
    };
    SocketController.prototype.receiveMessage = function () {
        // Nachricht empfangen
        this.socket.on('chat message', function (msg) {
            console.log(msg);
            SmartphoneSimController.message(msg);
        });
    };
    SocketController.prototype.receiveTimepointId = function () {
        // Nachricht empfangen
        this.socket.on('timepoint id', function (id) {
            aNicerWay.goTo(id);
        });
    };
    return SocketController;
}());