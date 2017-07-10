class SocketIOService {

    // Socket io
    private socket: any;

    constructor(socket_io:boolean) {

        if(socket_io) {

            this.socket = io();

            this.receiveCommand();
            this.receivePing();
            this.receiveMessage();
            this.receiveTimepointId();
        }
        else{

            console.warn('kein Socket IO');

            const text = '<span class="small">Eingeschränkte DEMO:<br> ' + 'Die App läuft nicht auf einem <i>Socket IO</i> fähigen Server.</span>';
            $('#remote-list-header').html(text);
        }
    }

    // SEND
    send(type: any, msg: any) {
       // console.log('aNicerWay.socket_io: ' +aNicerWay.socket_io);

        if(aNicerWay.socket_io === false){
            // Nachricht schicken
            socketSimulatorService.receive(type, msg);

        }
        else{
          //  console.log('emit'+ type + ' : ' + msg);

            this.socket.emit(type, msg);

        }

    }


    sendPing() {

        let png = 'PING';

        // Nachricht schicken
        this.send('ping_2', png);
    }


    sendList() {

        let list = aNicerWay.getTimeWayPointList();

        // liste schicken
        this.send('timepoint list', list);
    }


    sendTimePointNr(nr: number) {

        this.send('timepoint nr', nr);
    }


// RECEIVE

    receiveCommand() {

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
        this.socket.on('command', function (cmd: string) {

             //   console.log(cmd);


                let found_action = cmd.search('action-');
                let found_character = cmd.search('character-');

                // Nach "action-" suchen
                if (found_action === 0) {

                    let action = cmd.replace('action-', '');
                    aNicerWay.characterController.action(action);

                }

                // nach "character-" suchen
                else if (found_character === 0) {

                    let character_id = cmd.replace('character-', '');
                    aNicerWay.characterController.changeCharacter(character_id);

                } else {


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
            }
        )
    }

    receivePing() {

        // ping_2 empfangen
        this.socket.on('ping_2', function () {

            console.log('PING');
            SmartphoneSimController.ping();
        })


    }

    receiveMessage() {

        // Nachricht empfangen
        this.socket.on('chat message', function (msg: string) {

            console.log(msg);
            SmartphoneSimController.message(msg);
            aNicerWay.characterController.talk(msg);
        })

    }


    receiveTimepointId() {

        // Nachricht empfangen
        this.socket.on('timepoint id', function (id: any) {

            aNicerWay.goTo(id);
        })

    }


}
