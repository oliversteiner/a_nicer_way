/**
 *  phoneSimController
 *
 */
var PhoneSimController = (function () {
    /**
     * constructor
     */
    function PhoneSimController() {
        // Vars
        this.className = 'phoneSimController';
        this.idName = 'phone-sim';
        this.elemRoot = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
        // debug
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    PhoneSimController.prototype.addAllEventsListeners = function () {
        this.elemRoot.addEventListener('click', this.testClick.bind(this), false);
    };
    /**
     * set
     *
     */
    PhoneSimController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    PhoneSimController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    /**
     * testClick
     *
     */
    PhoneSimController.prototype.testClick = function () {
        this.get();
        $(this.elemRoot).effect("bounce", "slow");
    };
    return PhoneSimController;
}());
