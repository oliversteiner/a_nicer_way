/**
 *  debugDisplayController
 *
 */
var debugDisplayController = (function () {
    /**
     *
     */
    function debugDisplayController() {
        // debug
        console.log(this.className);
        // Vars
        this.className = 'debugDisplayController';
        this.idName = 'debug-display';
        this.elem = document.getElementById(this.idName);
        document.getElementById("debug-display").addEventListener("click", function () {
            console.log('TEST 2');
        });
        // functions
        this.addAllEventsListeners();
    }
    /**
     *
     */
    debugDisplayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick());
    };
    /**
     *
     *
     */
    debugDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     *
     *
     */
    debugDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    debugDisplayController.prototype.testClick = function () {
        console.log('click');
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return debugDisplayController;
}());
//# sourceMappingURL=debugDisplayController.js.map