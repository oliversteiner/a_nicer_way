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
        $(".remote-button-open-new-window").click(RemoteDisplayController.remoteOpenInNewWindow);
        // Remote inline-Demo
        $(".remote-button-inline-demo").click(RemoteDisplayController.remoteOpenInline);
    };
    /**
     *
     */
    RemoteDisplayController.activateKeystrokes = function () {
        // Keystrokes
        $(document).keypress(function (event) {
            console.log(event.which);
            var key = 82; // Taste "r"
            if (event.which === key && !$(document.activeElement).is(_protectedInputs)) {
                event.preventDefault();
                // Das Hilfsfenster ein / ausblenden
                $('#help-modal').modal('toggle');
            }
        });
    };
    /**
     * makeDraggable
     */
    RemoteDisplayController.makeDraggable = function () {
        $('#' + _remoteDisplayContentName).draggable().dblclick(RemoteDisplayController.modalClose);
    };
    /**
     *
     */
    RemoteDisplayController.remoteOpenInNewWindow = function () {
        // document.location = 'remote.html';
    };
    /**
     *
     */
    RemoteDisplayController.remoteOpenInline = function () {
        $('#remote-display-content').show();
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
