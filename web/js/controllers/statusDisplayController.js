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
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
        // debug
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    StatusDisplayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    StatusDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    StatusDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    StatusDisplayController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return StatusDisplayController;
}());
