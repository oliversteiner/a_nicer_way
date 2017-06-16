/**
 *  remoteDisplayController
 *
 */
// Global
var _remoteDisplayName = 'remote-display';
var _remoteDisplayContentName = 'remote-display-content';
var _remoteDisplayModalOpen = false;
// Class
var RemoteDisplayController = (function () {
    /**
     * constructor
     */
    function RemoteDisplayController() {
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
        });
    }
    /**
     * addAllEventsListeners
     */
    RemoteDisplayController.addAllEventsListeners = function () {
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
    };
    /**
     *
     */
    RemoteDisplayController.activateKeystrokes = function () {
        key('r', function () {
            RemoteDisplayController.openModalCenterRemote();
        });
    };
    /**
     * makeDraggable
     */
    RemoteDisplayController.makeDraggable = function () {
        $('#' + _remoteDisplayContentName).draggable();
    };
    /**
     *
     */
    RemoteDisplayController.remoteOpenWindow = function () {
        window.open('/remote.html', '_self');
    };
    /**
     *
     */
    RemoteDisplayController.remoteOpenInline = function () {
        $('#remote-display-content').show();
        ANicerWay.closeModalCenter();
    };
    /**
     *
     *
     */
    RemoteDisplayController.openModalCenterRemote = function () {
        console.log('openModalCenterRemote');
        ANicerWay.openModalCenter();
        $('#remote-modal-how-open').show();
    };
    /**
     * Fenster
     *
     */
    RemoteDisplayController.modalClose = function () {
        _remoteDisplayModalOpen = false;
        $('#' + _remoteDisplayContentName).hide();
    };
    RemoteDisplayController.modalOpen = function () {
        _remoteDisplayModalOpen = true;
        $('#' + _remoteDisplayContentName).show();
    };
    RemoteDisplayController.modalToggle = function () {
        if (_remoteDisplayModalOpen) {
            RemoteDisplayController.modalClose();
        }
        else {
            RemoteDisplayController.modalOpen();
        }
    };
    return RemoteDisplayController;
}());
