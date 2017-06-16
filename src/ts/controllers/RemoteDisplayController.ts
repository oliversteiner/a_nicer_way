/**
 *  remoteDisplayController
 *
 */

// Global
const _remoteDisplayName: string = 'remote-display';
const _remoteDisplayContentName: string = 'remote-display-content';
let _remoteDisplayModalOpen: boolean = false;

// Class
class RemoteDisplayController {

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.elem_Root = document.getElementById(_remoteDisplayName);
        this.elem_Content = document.getElementById(_remoteDisplayContentName);

        // Views laden


        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#remote-display-ready').ready(function () {
                console.log('- Remote Display load');

                // Aktionen verknüpfen
                RemoteDisplayController.makeDraggable();
                RemoteDisplayController.addAllEventsListeners();
                RemoteDisplayController.activateKeystrokes();

                //
                console.log('- Remote Display ready');
            }
        )


    }

    /**
     * addAllEventsListeners
     */
    static addAllEventsListeners() {

        // Button Close Display
        $('.remote-display-button-close').click(RemoteDisplayController.modalClose);

        // Button Show Display
        $('.remote-display-button-toggle').click(RemoteDisplayController.modalToggle);

        // Öffne nachfrage
        $('.modal-center-button-remote').click(RemoteDisplayController.openModalCenterRemote);


        // Remote in neuem Fenster öffnen
        $(".remote-button-open-window").click(RemoteDisplayController.remoteOpenWindow);

        // Remote inline-Demo
        $(".remote-button-open-inline").click(RemoteDisplayController.remoteOpenInline);


    }

    /**
     *
     */
    static activateKeystrokes() {

        key('r', function () {
            RemoteDisplayController.openModalCenterRemote();
        });


    }

    /**
     * makeDraggable
     */
    static  makeDraggable() {
        $('#' + _remoteDisplayContentName).draggable();
    }


    /**
     *
     */
    static  remoteOpenWindow() {

        window.open('/remote.html', '_self')
    }


    /**
     *
     */
    static  remoteOpenInline() {

        $('#remote-display-content').show();
        ANicerWay.closeModalCenter();
    }

    /**
     *
     *
     */
    static openModalCenterRemote() {
        console.log('openModalCenterRemote');

        ANicerWay.openModalCenter();
        $('#remote-modal-how-open').show();
    }


    /**
     * Fenster
     *
     */
    static modalClose() {
        _remoteDisplayModalOpen = false;
        $('#' + _remoteDisplayContentName).hide();
    }

    static modalOpen() {
        _remoteDisplayModalOpen = true;
        $('#' + _remoteDisplayContentName).show();
    }

    static modalToggle() {
        if (_remoteDisplayModalOpen) {
            RemoteDisplayController.modalClose();
        }
        else {
            RemoteDisplayController.modalOpen();
        }
    }


}