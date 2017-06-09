/**
 *  debugDisplayController
 *
 */
var DebugDisplayController = (function () {
    /**
     * constructor
     */
    function DebugDisplayController() {
        // Vars
        this.className = 'debugDisplayController';
        this.idName = 'debug-display';
        this.elemRoot = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
        // debug
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    DebugDisplayController.prototype.addAllEventsListeners = function () {
        this.elemRoot.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    DebugDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    DebugDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    DebugDisplayController.prototype.testClick = function () {
        this.get();
        $(this.elemRoot).effect("bounce", "slow");
    };
    return DebugDisplayController;
}());
