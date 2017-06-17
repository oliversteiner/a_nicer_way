/// <reference path="definitions/io.d.ts" />


$(function () {

        // Init
        let socket = io();
        socketAddListeners();
        receivePing();
        receiveCommand();
        receiveMessage();


        // SEND
        function socketSend(type: any, msg: any) {
            // Nachricht schicken
            socket.emit(type, msg);

        }

        function sendMessge() {
            console.log('button message');

            let $button_socket_message = $('#input-socket-message');
            let msg = $button_socket_message.val();

            // Nachricht schicken
            socketSend('chat message', msg);

            // Inputfeld leeren
            $button_socket_message.val('');


        }

        function sendPing() {
            // ping_2 schicken
            console.log('button ping');

            let png = 'PING';

            // Nachricht schicken
            socketSend('ping_2', png);

            // Inputfeld leeren


        }

        function sendCommand() {
            // ping_2 schicken
            let data = $(this).data();
            let cmd = data.command;
            console.log(cmd);

            // Nachricht schicken
            socketSend('command', cmd);

        }


        // RECEIVE
        function receiveCommand() {

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
            socket.on('command', function (cmd: string) {

                    console.log(cmd);

                    switch (cmd) {

                        case 'previous':
                            NavigationController.scrollToPreviews();
                            break;

                        case 'next':
                            NavigationController.scrollToNext();
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
                            SmartphoneSimController.message('noch nicht implementiert');
                            break;

                        case 'remote-toggle':
                            RemoteDisplayController.modalToggle();
                            break;

                        case 'help-toggle':

                            break;



                        default:
                            SmartphoneSimController.error('Remotebefehl nicht verstanden');
                            SmartphoneSimController.error('> ' + cmd, 1);
                    }
                }
            )
        }

        function receivePing() {
            // ping_2 empfangen

            socket.on('ping_2', function () {

                console.log('PING');
                SmartphoneSimController.ping();

            })


        }

        function receiveMessage() {

            // Nachricht empfangen

            socket.on('chat message', function (msg: string) {

                console.log(msg);
                SmartphoneSimController.message(msg);

            })

        }


        // Listeners
        function socketAddListeners() {
            $('.button-socket-message').click(sendMessge);
            $('.button-socket-ping').click(sendPing);
            $('.button-socket-steuerbefehl').click(sendCommand);
            $('.button-socket-cmd').click(sendCommand);

        }


    }
);