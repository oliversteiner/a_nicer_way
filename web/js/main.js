/*
 / <reference path="controllers/debugDisplayController.ts"/>
 / <reference path="controllers/phoneSimController.ts"/>
 / <reference path="controllers/statusDisplayController.ts"/>
 / <reference path="controllers/timewayController.ts"/>
 / <reference path="controllers/navigationController.ts"/>
 */
/**
 *  aNicerWay
 *
 */
var aNicerWay = (function () {
    function aNicerWay(parameters) {
        var debug = parameters.debug;
        this.className = 'aNicerWay';
        console.log(this.className);
        // Debugmodus ein ?
        if (debug) {
            aNicerWay.showDebug();
        }
        // load all Controllers
        var debug_display_controller = new debugDisplayController();
        var phone_sim_controller = new phoneSimController();
        var status_display_controller = new statusDisplayController();
        var timeway_controller = new timewayController();
        var navigation_controller = new navigationController();
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
     * debug
     *
     */
    aNicerWay.showDebug = function () {
        var elem_debug_display = document.getElementById('debug-display');
        var elem_status_display = document.getElementById('status-display');
        var elem_phone_sim = document.getElementById('phone-sim');
        var elem_timeway = document.getElementById('timeway');
        var elem_navigation = document.getElementById('navigation');
        elem_debug_display.style.display = 'block';
        elem_debug_display.classList.add('debug');
        elem_status_display.classList.add('debug');
        elem_phone_sim.classList.add('debug');
        elem_timeway.classList.add('debug');
        elem_navigation.classList.add('debug');
        return true;
    };
    return aNicerWay;
}());
// init
var options = { debug: true };
var a_nicer_way = new aNicerWay(options);
