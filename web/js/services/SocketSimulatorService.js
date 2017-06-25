var SocketSimulatorService = (function () {
    function SocketSimulatorService() {
    }
    SocketSimulatorService.prototype.receive = function (type, msg) {
        console.log('Socket Simulator: ' + type + ' ' + msg);
        switch (type) {
            case 'command':
                this.receiveCommand(msg);
                break;
            case 'chat message':
                this.receiveMessage(msg);
                break;
            case 'ping_2':
                this.receivePing();
                break;
            case 'timepoint id':
                this.receiveTimepointId(msg);
                break;
        }
    };
    ;
    // RECEIVE
    SocketSimulatorService.prototype.receiveCommand = function (cmd) {
        var found_action = cmd.search('action-');
        var found_character = cmd.search('character-');
        // Nach "action-" suchen
        if (found_action === 0) {
            var action = cmd.replace('action-', '');
            aNicerWay.characterController.action(action);
        }
        else if (found_character === 0) {
            var character_id = cmd.replace('character-', '');
            aNicerWay.characterController.changeCharacter(character_id);
        }
        else {
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
                    aNicerWay.displayController.toggle('navigation');
                    break;
                case 'data-display-toggle':
                    aNicerWay.displayController.toggle('data');
                    break;
                case 'smartphone-sim-toggle':
                    SmartphoneSimController.toggle();
                    break;
                case 'console-toggle':
                    ConsoleController.modalToggle();
                    break;
                case 'remote-toggle':
                    aNicerWay.displayController.toggle('remote');
                    break;
                case 'help-toggle':
                    HelpController.modalToggle();
                    break;
                case 'get-list':
                    socketIOService.sendList();
                    break;
                case 'dont-talk':
                    aNicerWay.characterController.dontTalk();
                    break;
                default:
                    SmartphoneSimController.error('Remotebefehl nicht verstanden');
                    SmartphoneSimController.error('> ' + cmd, 1);
            }
        }
    };
    SocketSimulatorService.prototype.receivePing = function () {
        // ping_2 empfangen
        console.log('PING');
        SmartphoneSimController.ping();
    };
    SocketSimulatorService.prototype.receiveMessage = function (msg) {
        // Nachricht empfangen
        SmartphoneSimController.message(msg);
        aNicerWay.characterController.talk(msg);
    };
    SocketSimulatorService.prototype.receiveTimepointId = function (id) {
        // Nachricht empfangen
        aNicerWay.goTo(id);
    };
    SocketSimulatorService.prototype.receiveTimepointList = function (list) {
    };
    return SocketSimulatorService;
}());
