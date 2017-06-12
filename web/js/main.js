/**
 *  aNicerWay
 *
 */
var ANicerWay = (function () {
    function ANicerWay(options) {
        this.timePointAktuell = 0;
        var simulator_size = options.simulator_size;
        this.className = 'aNicerWay';
        // alle html-views zusammensetzen
        $('#main_navigation').load('views/main_navigation.html');
        var dataDisplayController = new DataDisplayController();
        var smartphoneSimController = new SmartphoneSimController(simulator_size);
        var statusDisplayController = new StatusDisplayController();
        var navigationController = new NavigationController();
        //  $('#timeway').load('views/timeway.html');
        //  $('#status-display').load('views/status_display.html');
        // load all Controllers
        console.log('load');
        // Warte kurz, damit die dynamisch eingefügten HTML-dokument schon geladen sind.
        //    let consoleDisplayController = new ConsoleDisplayController();
        //    let statusDisplayController = new StatusDisplayController();
        //    let timewayController = new TimewayController();
        //alert('ready');
    }
    /**
     * get
     *
     */
    ANicerWay.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
        return this.className;
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
    window.addEventListener('keypress', function (event) {
        if (event.keyCode == 37) {
            NavigationController.scrollToPreviews;
        }
    });
    window.addEventListener('keypress', function (event) {
        if (event.keyCode == 39) {
            NavigationController.scrollToPreviews;
        }
    });
}, 2000);
