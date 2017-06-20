/**
 *  consoleDisplayController
 *
 */
var StatusDisplayController = (function () {
    /**
     * constructor
     */
    function StatusDisplayController() {
        // Vars
        this.elem_Root = document.getElementById('status-display');
        this.elem_Content = document.getElementById('status-display-content');
        console.log('- Status Display load');
        // functions
        this.addEventListeners();
        // Tests
        // Meldung
        console.log('- Status Display  ready');
    }
    /**
     * addEventsListeners
     */
    StatusDisplayController.prototype.addEventListeners = function () {
    };
    /**
     *
     *
     * @param id
     */
    StatusDisplayController.setData = function (doc) {
        $('#status-display-date').text(doc.date);
        $('#status-display-place').text(doc.place);
        $('#status-display-feeling').text(doc.feeling);
    };
    return StatusDisplayController;
}());
