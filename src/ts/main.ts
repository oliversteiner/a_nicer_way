/**
 *  aNicerWay
 *
 */
class ANicerWay {
    public className: string;
    public timePointAktuell = 0;

    constructor(parameters: { simulator_size: number }) {
        let simulator_size = parameters.simulator_size;

        this.className = 'aNicerWay';


        // alle html-views zusammensetzen
        $('#main_navigation').load('views/main_navigation.html');

        let dataDisplayController = new DataDisplayController();
        let smartphoneSimController = new SmartphoneSimController(2);

        //  $('#navigation').load('views/navigation_display.html').hide();
        //  $('#timeway').load('views/timeway.html');
        //  $('#status-display').load('views/status_display.html');

        // load all Controllers
        console.log('load');

        // Warte kurz, damit die dynamisch eingefügten HTML-dokument schon geladen sind.

        //    let consoleDisplayController = new ConsoleDisplayController();
        //    let statusDisplayController = new StatusDisplayController();
        //    let timewayController = new TimewayController();
        //    let navigationController = new NavigationController();
        //alert('ready');


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


}

// init
let options = {
    simulator_size: 1
};
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