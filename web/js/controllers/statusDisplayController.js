/**
 *  consoleDisplayController
 *
 */
// Global
var _statusDisplayName = 'status-display';
var _statusDisplayContentName = 'status-display-content';
var StatusDisplayController = (function () {
    /**
     * constructor
     */
    function StatusDisplayController() {
        // Vars
        this.elem_Root = document.getElementById(_statusDisplayName);
        this.elem_Content = document.getElementById(_statusDisplayContentName);
        // Views laden
        $(this.elem_Root).load('../views/status_display.html'); // aus dem View-Verzeichnis laden, und gleich ausblenden
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#status-display-ready').ready(function () {
            console.log('- Status Display load');
            // functions
            StatusDisplayController.addAllEventsListeners();
            // Tests
            // Meldung
            console.log('- Status Display  ready');
        });
    }
    /**
     * addAllEventsListeners
     */
    StatusDisplayController.addAllEventsListeners = function () {
    };
    /**
     *
     *
     * @param id
     */
    StatusDisplayController.setData = function (id) {
        var promise = DbController.loadWayPoint(id);
        promise.then(function (doc) {
            $('#Date_status').text(doc.date);
            $('#Place_status').text(doc.place);
            $('#Feeling_status').text(doc.feeling);
        });
    };
    return StatusDisplayController;
}());
