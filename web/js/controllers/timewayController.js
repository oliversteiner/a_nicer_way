/**
 *  timewayController
 *
 */
var TimewayController = (function () {
    /**
     * constructor
     */
    function TimewayController() {
        // Vars
        this.className = 'timewayController';
        this.idName = 'timeway';
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
        // debug
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    TimewayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    TimewayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    TimewayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    TimewayController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return TimewayController;
}());
