/**
 *  aNicerWay
 *
 */
class ANicerWay {
    public className: string;
    public timePointAktuell = 0;

    constructor(parameters: { debug_modus: any }) {
        let debug_modus = parameters.debug_modus;

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
            let consoleDisplayController = new ConsoleDisplayController();
            let smartphoneSimController = new SmartphoneSimController();
            let statusDisplayController = new StatusDisplayController();
            let timewayController = new TimewayController();
            let navigationController = new NavigationController();
            let dataDisplayController = new DataDisplayController();
            //alert('ready');


            console.log('ready');
        }, 1000);

    }


    /**
     * get
     *
     */
    get() {
        // Test
        console.log(' - ' + this.className + '.get()');
        return this.className;
    }

    setTimePoint(point: number) {
        // Test
        this.timePointAktuell = point;
        console.log('Timepoint: ' + point);
    }

    getTimePoint() {
        return this.timePointAktuell;
    }

    /**
     * debugModus
     *
     */
    public static debugModus() {
        let elem_console_display: any = document.getElementById('console-display');
        let elem_status_display: any = document.getElementById('status-display');
        let elem_smartphone_sim: any = document.getElementById('smartphone-sim');
        let elem_timeway: any = document.getElementById('timeway');
        let elem_navigation: any = document.getElementById('navigation');
        let elem_data_display: any = document.getElementById('data-display');

        elem_console_display.style.display = 'block';

        elem_console_display.classList.add('debug-modus');
        elem_status_display.classList.add('debug-modus');
        elem_smartphone_sim.classList.add('debug-modus');
        elem_timeway.classList.add('debug-modus');
        elem_navigation.classList.add('debug-modus');
        elem_data_display.classList.add('debug-modus');

        return true;
    }


}

// init
let options = {debug_modus: false};
let aNicerWay = new ANicerWay(options);


setTimeout(function () {

    let parent_old = 0;

    function ostParallax(parent: any, elem: string, faktor: string, richtung: string) {

        let child: any = $(elem).css('left');

        $(elem).css("left", richtung + "=" + faktor);


    }


    $('#timeway-content').scroll(function () {
        let richtung = '';

        let parent = $('#timeway-content').scrollLeft();


        if (parent_old < parent) {
            richtung = '+';
        } else {
            richtung = '-';
        }
        ostParallax(parent, '#layer-1-himmel', '2', richtung);
        ostParallax(parent, '#layer-2-berge', '3', richtung);
        ostParallax(parent, '#layer-3-aktiv', '5', richtung);
        ostParallax(parent, '#layer-4-baume', '6', richtung);

        parent_old = parent;
    });



    window.addEventListener('keypress', function(event) {
        if (event.keyCode == 37) {
            NavigationController.scrollToPreviews;
        }
    });

    window.addEventListener('keypress', function(event) {
        if (event.keyCode == 39) {
            NavigationController.scrollToPreviews;
        }
    });

}, 2000);