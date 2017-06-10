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
        this.className = 'statusDisplayController';
        this.idName = 'status-display';
        this.elemRoot = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
        // console
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    StatusDisplayController.prototype.addAllEventsListeners = function () {
        this.elemRoot.addEventListener('click', this.testClick.bind(this), false);
    };
    StatusDisplayController.setData = function (id) {
        var promise = DbController.loadWayPoint(id);
        promise.then(function (doc) {
            $('#Date_status').text(doc.date);
            $('#Place_status').text(doc.place);
            $('#Feeling_status').text(doc.feeling);
        });
    };
    /**
     * get
     *
     */
    StatusDisplayController.prototype.get = function () {
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    StatusDisplayController.prototype.testClick = function () {
        this.get();
        $(this.elemRoot).effect("bounce", "slow");
    };
    return StatusDisplayController;
}());
