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
            // Aktionen verknüpfen
            RemoteDisplayController.makeDraggable();
            RemoteDisplayController.addAllEventsListeners();
            // RemoteDisplayController.modalClose();
            //
            console.log('- Data Display ready');
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
    };
    /**
     * makeDraggable
     */
    RemoteDisplayController.makeDraggable = function () {
        $('#' + _remoteDisplayContentName).draggable().dblclick(RemoteDisplayController.modalClose);
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
