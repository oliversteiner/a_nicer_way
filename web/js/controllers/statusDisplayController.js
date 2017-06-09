/**
 *  debugDisplayController
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
        // debug
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    StatusDisplayController.prototype.addAllEventsListeners = function () {
        this.elemRoot.addEventListener('click', this.testClick.bind(this), false);
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
