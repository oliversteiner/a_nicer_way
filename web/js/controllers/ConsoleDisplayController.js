/**
 *  consoleDisplayController
 *
 */
var ConsoleDisplayController = (function () {
    /**
     * constructor
     */
    function ConsoleDisplayController() {
        // Vars
        this.className = 'ConsoleDisplayController';
        this.idName = 'console-display';
        this.elem_Root = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
    }
    /**
     * addAllEventsListeners
     */
    ConsoleDisplayController.prototype.addAllEventsListeners = function () {
        this.elem_Root.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    ConsoleDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    ConsoleDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    ConsoleDisplayController.prototype.testClick = function () {
        this.get();
        $(this.elem_Root).effect("bounce", "slow");
    };
    return ConsoleDisplayController;
}());
