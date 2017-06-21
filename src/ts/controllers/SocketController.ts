/**
 * Created by ost on 20.06.17.
 */
class SocketController {

    // Socket io
    private socket: any;

    constructor() {

        this.socket = io();

        this.receiveCommand();
        this.receivePing();
        this.receiveMessage();
        this.receiveTimepointId();
    }

    // SEND
    socketSend(type: any, msg: any) {

        // Nachricht schicken
        this.socket.emit(type, msg);
    }

    sendPing() {

        let png = 'PING';

        // Nachricht schicken
        this.socketSend('ping_2', png);
    }


    sendList() {

        let list = aNicerWay.getTimeWayPointList();

        // liste schicken
        this.socketSend('timepoint list', list);
    }


    sendTimePointNr(nr:number) {

        this.socketSend('timepoint nr', nr);
    }


// RECEIVE

    receiveCommand() {

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
        this.socket.on('command', function (cmd: string) {

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
        })

    }


    receiveTimepointId() {

        // Nachricht empfangen
        this.socket.on('timepoint id', function (id: any) {

            aNicerWay.goTo(id);
        })

    }


}
