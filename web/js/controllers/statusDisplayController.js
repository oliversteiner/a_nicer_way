/**
 *  debugDisplayController
 *
 */
var statusDisplayController = (function () {
    /**
     * constructor
     */
    function statusDisplayController() {
        // debug
        console.log(this.className);
        // Vars
        this.className = 'statusDisplayController';
        this.idName = 'status-display';
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
    }
    /**
     * addAllEventsListeners
     */
    statusDisplayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    statusDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    statusDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    statusDisplayController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return statusDisplayController;
}());
