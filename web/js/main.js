/**
 *  aNicerWay
 *
 */
var ANicerWay = (function () {
    function ANicerWay(parameters) {
        this.timePointAktuell = 0;
        var debug_modus = parameters.debug_modus;
        this.className = 'aNicerWay';
        console.log(this.className);
        // debug-modus ein ?
        if (debug_modus) {
            //   this.debugModus();
        }
        // alle html-views zusammensetzen
        $('#data-display').load('views/data_display.html').hide(); // aus dem View-Verzeichnis laden, und gleich ausblenden
        $('#smartphone-sim').load('views/smartphone_sim.html'); // aus dem View-Verzeichnis laden, und gleich ausblenden
        $('#navigation').load('views/navigation_display.html').hide();
        $('#timeway').load('views/timeway.html');
        $('#main_navigation').load('views/main_navigation.html');
        $('#status-display').load('views/status_display.html');
        // load all Controllers
        console.log('load');
        // Warte kurz, damit die dynamisch eingefügten HTML-dokument schon geladen sind.
        setTimeout(function () {
            var consoleDisplayController = new ConsoleDisplayController();
            var smartphoneSimController = new SmartphoneSimController();
            var statusDisplayController = new StatusDisplayController();
            var timewayController = new TimewayController();
            var navigationController = new NavigationController();
            var dataDisplayController = new DataDisplayController();
            //alert('ready');
            console.log('ready');
        }, 1000);
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
    /**
     * debugModus
     *
     */
    ANicerWay.debugModus = function () {
        var elem_console_display = document.getElementById('console-display');
        var elem_status_display = document.getElementById('status-display');
        var elem_smartphone_sim = document.getElementById('smartphone-sim');
        var elem_timeway = document.getElementById('timeway');
        var elem_navigation = document.getElementById('navigation');
        var elem_data_display = document.getElementById('data-display');
        elem_console_display.style.display = 'block';
        elem_console_display.classList.add('debug-modus');
        elem_status_display.classList.add('debug-modus');
        elem_smartphone_sim.classList.add('debug-modus');
        elem_timeway.classList.add('debug-modus');
        elem_navigation.classList.add('debug-modus');
        elem_data_display.classList.add('debug-modus');
        return true;
    };
    return ANicerWay;
}());
// init
var options = { debug_modus: false };
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
