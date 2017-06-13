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
            $('#status-display-date').text(doc.date);
            $('#status-display-place').text(doc.place);
            $('#status-display-feeling').text(doc.feeling);
        });
    };
    return StatusDisplayController;
}());
