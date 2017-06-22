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
    RemoteDisplayController.prototype.addEventListeners = function () {
        // Öffne nachfrage
        $('.modal-center-button-remote').click(RemoteDisplayController.openModalCenterRemote);
        // Remote in neuem Fenster öffnen
        $(".remote-button-open-window").click(RemoteDisplayController.remoteOpenWindow);
        // Remote inline-Demo
        $(".remote-button-open-inline").click(RemoteDisplayController.remoteOpenInline);
    };
    /**
     * addKeystrokes
     */
    RemoteDisplayController.prototype.addKeystrokes = function () {
        key('r', function () {
            RemoteDisplayController.openModalCenterRemote();
        });
    };
    /**
     *
     */
    RemoteDisplayController.remoteOpenWindow = function () {
        window.open('/remote.html', '_blank');
        ANicerWay.closeModalCenter();
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
    return RemoteDisplayController;
}());
