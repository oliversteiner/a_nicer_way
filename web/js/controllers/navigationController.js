/**
 *  navigationController
 *
 */
var navigationController = (function () {
    /**
     * constructor
     */
    function navigationController() {
        // debug
        console.log(this.className);
        // Vars
        this.className = 'navigationController';
        this.idName = 'navigation';
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
    }
    /**
     * addAllEventsListeners
     */
    navigationController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    navigationController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    navigationController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    navigationController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return navigationController;
}());
