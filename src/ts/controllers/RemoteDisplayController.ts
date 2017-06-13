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

                // Aktionen verknüpfen
                RemoteDisplayController.makeDraggable();
                RemoteDisplayController.addAllEventsListeners();
               // RemoteDisplayController.modalClose();

                //
                console.log('- Data Display ready');
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

    }

    /**
     * makeDraggable
     */
    static  makeDraggable() {

        $('#' + _remoteDisplayContentName).draggable().dblclick(RemoteDisplayController.modalClose);

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