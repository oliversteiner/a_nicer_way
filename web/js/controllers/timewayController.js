/**
 *  timewayController
 *
 */
var timewayController = (function () {
    /**
     * constructor
     */
    function timewayController() {
        // debug
        console.log(this.className);
        // Vars
        this.className = 'timewayController';
        this.idName = 'timeway';
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
    }
    /**
     * addAllEventsListeners
     */
    timewayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    timewayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    timewayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    timewayController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return timewayController;
}());
