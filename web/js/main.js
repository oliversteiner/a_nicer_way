var aNicerWay;
var _aNicerWayVersion = '1.2b';
var _lastTimePoint = 0;
/**
 *  aNicerWay
 *
 */
var ANicerWay = (function () {
    function ANicerWay(options) {
        this.version = _aNicerWayVersion;
        this.timePointAktuell = 0;
        this.firstTimePoint = 1;
        this.lastTimePoint = 0;
        this.options = options.simulator_size;
        this.loadTimePoints();
        this.loadComponents();
        this.addAllEventsListeners();
        ANicerWay.setVersion();
    }
    /**
     *
     *
     */
    ANicerWay.prototype.loadComponents = function () {
        this.dbController = new DbController();
        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.options.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();
        this.timewayController = new TimewayController();
    };
    /**
     * addAllEventsListeners
     *
     */
    ANicerWay.prototype.addAllEventsListeners = function () {
        // Button Close Display
        // $('.navigation-display-button-close').click(NavigationController.modalClose);
        // Keystrokes
        $('body').keypress(function (event) {
            var key = 104; // Taste "h"
            if (event.which == key) {
                event.preventDefault();
                // Das Hilfsfenster ein / ausblenden
                $('#help-modal').modal('toggle');
            }
        });
    };
    ANicerWay.prototype.loadTimePoints = function () {
        console.log('loadTimePoints');
        var promise = DbController.loadAllWayPoints();
        return promise.then(function (doc) {
            var lastTimePoint = doc.rows.length;
            _lastTimePoint = doc.rows.length;
            // Wenn keine Timepoints vorhanden, standart einlesen:
            if (doc.rows.length == 0) {
                reset();
            }
            aNicerWay.lastTimePoint = lastTimePoint;
            _lastTimePoint = lastTimePoint;
            return lastTimePoint;
        });
    };
    ANicerWay.prototype.setTimePoint = function (point) {
        // Test
        this.timePointAktuell = point;
        console.log('Timepoint: ' + point);
    };
    ANicerWay.prototype.getTimePoint = function () {
        return this.timePointAktuell;
    };
    ANicerWay.prototype.getLastTimePoint = function () {
        return this.lastTimePoint;
    };
    ANicerWay.prototype.getFirstTimePoint = function () {
        return this.firstTimePoint;
    };
    ANicerWay.setVersion = function () {
        $('.version').text(_aNicerWayVersion);
    };
    return ANicerWay;
}());
function reset() {
    var options = {
        simulator_size: 'gross' // klein, gross
    };
    DbController.loadDefault();
    var aNicerWay = new ANicerWay(options);
}
$(document).ready(function () {
    var options = {
        simulator_size: 'gross' // klein, gross
    };
    aNicerWay = new ANicerWay(options);
});
