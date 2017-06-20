/**
 *  consoleDisplayController
 *
 */
var consoleDisplayController = (function () {
    /**
     *
     */
    function consoleDisplayController() {
        // console
        console.log(this.className);
        // Vars
        this.className = 'consoleDisplayController';
        this.idName = 'console-display';
        this.elem = document.getElementById(this.idName);
        document.getElementById("console-display").addEventListener("click", function () {
            console.log('TEST 2');
        });
        // functions
        this.addAllEventsListeners();
    }
    /**
     *
     */
    consoleDisplayController.prototype.addAllEventsListeners = function () {
        this.elem.addEventListener('click', this.testClick());
    };
    /**
     *
     *
     */
    consoleDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     *
     *
     */
    consoleDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    consoleDisplayController.prototype.testClick = function () {
        console.log('click');
        this.get();
        $(this.elem).effect("bounce", "slow");
    };
    return consoleDisplayController;
}());
//# sourceMappingURL=consoleDisplayController.js.map