class SocketSimulatorService {


    constructor() {

    }

    receive(type: string, msg: string) {

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

// RECEIVE

    receiveCommand(cmd: string) {

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

    receivePing() {
        // ping_2 empfangen
        console.log('PING');
        SmartphoneSimController.ping();
    }


    receiveMessage(msg: string) {
        // Nachricht empfangen
        SmartphoneSimController.message(msg);
        aNicerWay.characterController.talk(msg);
    }


    receiveTimepointId(id: string) {
        // Nachricht empfangen
        aNicerWay.goTo(id);
    }

    receiveTimepointList(list: any) {


    }


}
