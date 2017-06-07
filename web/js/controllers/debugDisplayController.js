/**
 *  debugDisplayController
 *
 */
var debugDisplayController = (function () {
    /**
     * constructor
     */
    function debugDisplayController() {
        // debug
        console.log(this.className);
        // Vars
        this.className = 'debugDisplayController';
        this.idName = 'debug-display';
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
    }
    /**
     * addAllEventsListeners
     */
    debugDisplayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    debugDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    debugDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    debugDisplayController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return debugDisplayController;
}());
