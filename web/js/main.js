/**
 *  aNicerWay
 *
 */
var ANicerWay = (function () {
    function ANicerWay(options) {
        this.timePointAktuell = 1;
        this.options = options.simulator_size;
        // alle html-views zusammensetzen
        $('#main_navigation').load('views/main_navigation.html');
        $('#help-container').load('views/help.html');
        this.loadComponents();
        this.addAllEventsListeners();
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
    ANicerWay.prototype.setTimePoint = function (point) {
        // Test
        this.timePointAktuell = point;
        console.log('Timepoint: ' + point);
    };
    ANicerWay.prototype.getTimePoint = function () {
        return this.timePointAktuell;
    };
    return ANicerWay;
}());
// init
var options = {
    simulator_size: 'gross' // ohne, klein, gross
};
var aNicerWay = new ANicerWay(options);
setTimeout(function () {
    var parent_old = 0;
    function ostParallax(parent, elem, faktor, richtung) {
        var child = $(elem).css('left');
        $(elem).css("left", richtung + "=" + faktor);
    }
    $('#timeway-content').scroll(function () {
        var richtung = '';
        var parent = $('#timeway-content').scrollLeft();
        if (parent_old < parent) {
            richtung = '+';
        }
        else {
            richtung = '-';
        }
        ostParallax(parent, '#layer-1-himmel', '2', richtung);
        ostParallax(parent, '#layer-2-berge', '3', richtung);
        ostParallax(parent, '#layer-3-aktiv', '5', richtung);
        ostParallax(parent, '#layer-4-baume', '6', richtung);
        parent_old = parent;
    });
}, 2000);
