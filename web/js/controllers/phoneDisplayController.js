/**
 *  phoneSimController
 *
 */
var phoneSimController = (function () {
    /**
     * constructor
     */
    function phoneSimController() {
        // debug
        console.log(this.className);
        // Vars
        this.className = 'phoneSimController';
        this.idName = 'phone-sim';
        this.elem = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
    }
    /**
     * addAllEventsListeners
     */
    phoneSimController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    phoneSimController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    phoneSimController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    phoneSimController.prototype.testClick = function () {
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return phoneSimController;
}());
