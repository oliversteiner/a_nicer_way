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
        var debugDisplayController = new DebugDisplayController();
        var phoneSimController = new PhoneSimController();
        var statusDisplayController = new StatusDisplayController();
        var timewayController = new TimewayController();
        var navigationController = new NavigationController();
        var dataDisplayController = new DataDisplayController();
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
        var elem_data_display = document.getElementById('data-display');
        elem_debug_display.style.display = 'block';
        elem_debug_display.classList.add('debug');
        elem_status_display.classList.add('debug');
        elem_phone_sim.classList.add('debug');
        elem_timeway.classList.add('debug');
        elem_navigation.classList.add('debug');
        elem_data_display.classList.add('debug');
        return true;
    };
    return aNicerWay;
}());
// init
var options = { debug: true };
var a_nicer_way = new aNicerWay(options);
