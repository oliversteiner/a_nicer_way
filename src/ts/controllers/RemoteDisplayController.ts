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


        console.log('- Remote Display load');

        // Aktionen verknüpfen
        this.addEventListeners();
        this.addKeystrokes();

        //
        console.log('- Remote Display ready');


    }

    /**
     * addEventsListeners
     */
    addEventListeners() {



        // Öffne nachfrage
        $('.modal-center-button-remote').click(RemoteDisplayController.openModalCenterRemote);


        // Remote in neuem Fenster öffnen
        $(".remote-button-open-window").click(RemoteDisplayController.remoteOpenWindow);

        // Remote inline-Demo
        $(".remote-button-open-inline").click(RemoteDisplayController.remoteOpenInline);


    }

    /**
     * addKeystrokes
     */
    addKeystrokes() {

        key('r', function () {
            RemoteDisplayController.openModalCenterRemote();
        });
    }




    /**
     *
     */
    static  remoteOpenWindow() {
        window.open('/remote.html', '_blank');
        ANicerWay.closeModalCenter();
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





}