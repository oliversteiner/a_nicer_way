var SocketIOService = (function () {
    function SocketIOService(socket_io) {
        if (socket_io) {
            this.socket = io();
            this.receiveCommand();
            this.receivePing();
            this.receiveMessage();
            this.receiveTimepointId();
        }
        else {
            console.warn('kein Socket IO');
            var text = '<span class="small">Eingeschränkte DEMO:<br> ' + 'Die App läuft nicht auf einem <i>Socket IO</i> fähigen Server.</span>';
            $('#remote-list-header').html(text);
        }
    }
    // SEND
    SocketIOService.prototype.send = function (type, msg) {
        // console.log('aNicerWay.socket_io: ' +aNicerWay.socket_io);
        if (aNicerWay.socket_io === false) {
            // Nachricht schicken
            socketSimulatorService.receive(type, msg);
        }
        else {
            //  console.log('emit'+ type + ' : ' + msg);
            this.socket.emit(type, msg);
        }
    };
    SocketIOService.prototype.sendPing = function () {
        var png = 'PING';
        // Nachricht schicken
        this.send('ping_2', png);
    };
    SocketIOService.prototype.sendList = function () {
        var list = aNicerWay.getTimeWayPointList();
        // liste schicken
        this.send('timepoint list', list);
    };
    SocketIOService.prototype.sendTimePointNr = function (nr) {
        this.send('timepoint nr', nr);
    };
    // RECEIVE
    SocketIOService.prototype.receiveCommand = function () {
        /* - socket-cmd ----------------
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
            //   console.log(cmd);
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
        });
    };
    SocketIOService.prototype.receivePing = function () {
        // ping_2 empfangen
        this.socket.on('ping_2', function () {
            console.log('PING');
            SmartphoneSimController.ping();
        });
    };
    SocketIOService.prototype.receiveMessage = function () {
        // Nachricht empfangen
        this.socket.on('chat message', function (msg) {
            console.log(msg);
            SmartphoneSimController.message(msg);
            aNicerWay.characterController.talk(msg);
        });
    };
    SocketIOService.prototype.receiveTimepointId = function () {
        // Nachricht empfangen
        this.socket.on('timepoint id', function (id) {
            aNicerWay.goTo(id);
        });
    };
    return SocketIOService;
}());
