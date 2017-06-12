var _aNicerWayVersion = '1.1b';
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
        // alle html-views zusammensetzen
        $('#main_navigation').load('views/main_navigation.html');
        $('#help-container').load('views/help.html');
        this.loadTimePoints();
        this.loadComponents();
        this.addAllEventsListeners();
        $('#help-ready').ready(function () {
            ANicerWay.setVersion();
        });
    }
    /**
     *
     *
     */
    ANicerWay.prototype.loadComponents = function () {
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
        var promise = DbController.loadAllWayPoints();
        promise.then(function (doc) {
            aNicerWay.lastTimePoint = doc.rows.length;
            console.log(doc.rows);
            // Wenn keine Timepoints vorhanden, standart einlesen:
            if (doc.rows.length == 0) {
                reset();
            }
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
// init
var options = {
    simulator_size: 'gross' // klein, gross
};
var aNicerWay = new ANicerWay(options);
function reset() {
    DbController.loadDefault();
    aNicerWay = new ANicerWay(options);
}
