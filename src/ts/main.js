/// <reference path="controllers/consoleDisplayController.ts"/>
/**
 *  aNicerWay
 *
 */
var aNicerWay = (function () {
    function aNicerWay(parameters) {
        var console = parameters.console;
        this.className = 'aNicerWay';
        console.log(this.className);
        // consolemodus ein ?
        if (console) {
            aNicerWay.showconsole();
        }
        // load all Controllers
        var console_display_controller = new consoleDisplayController();
    }
    /**
     * get
     *
     */
    aNicerWay.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
        return this.className;
    };
    /**
     * console
     *
     */
    aNicerWay.showconsole = function () {
        var elem_console_display = document.getElementById('console-display');
        var elem_status_display = document.getElementById('status-display');
        var elem_phone_sim = document.getElementById('phone-sim');
        var elem_timeway = document.getElementById('timeway');
        elem_console_display.style.display = 'block';
        elem_console_display.classList.add('console');
        elem_status_display.classList.add('console');
        elem_phone_sim.classList.add('console');
        elem_timeway.classList.add('console');
        return true;
    };
    return aNicerWay;
}());
// init
var options = { console: true };
var a_nicer_way = new aNicerWay(options);
//# sourceMappingURL=main.js.map