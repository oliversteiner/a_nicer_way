/**
 *  aNicerWay
 *
 */
class aNicerWay {
    public className: string;

    constructor(parameters: { debug_modus: any }) {
        let debug_modus = parameters.debug_modus;

        this.className = 'aNicerWay';
        console.log(this.className);

        // debug-modus ein ?
        if (debug_modus) {
            aNicerWay.debugModus();
        }

        // alle html-views zusammensetzen
        $('#data-display').load('views/data_display.html').hide(); // aus dem View-Verzeichnis laden, und gleich ausblenden
        $('#smartphone-sim').load('views/smartphone_sim.html'); // aus dem View-Verzeichnis laden, und gleich ausblenden
        $('#navigation').load('views/navigation_display.html').hide();
        $('#timeway').load('views/timeway.html');

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
           // alert('ready');
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
let a_nicer_way = new aNicerWay(options);




