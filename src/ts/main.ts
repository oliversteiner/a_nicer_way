let _aNicerWayVersion = '1.1b';

/**
 *  aNicerWay
 *
 */
class ANicerWay {

    public version:string = _aNicerWayVersion;
    public timePointAktuell = 0;
    public firstTimePoint = 1;
    public lastTimePoint =0;


    public dataDisplayController: DataDisplayController;
    public smartphoneSimController: SmartphoneSimController;
    public statusDisplayController: StatusDisplayController;
    public navigationController: NavigationController;
    public timewayController: TimewayController;

    public options: any;

    constructor(options?: { simulator_size?: string }) {
        this.options = options.simulator_size;


        // alle html-views zusammensetzen
        $('#main_navigation').load('views/main_navigation.html');
        $('#help-container').load('views/help.html');

        this.loadTimePoints();
        this.loadComponents();
        this.addAllEventsListeners();


        $('#help-ready').ready(function () {
            ANicerWay.setVersion();
        })


    }

    /**
     *
     *
     */
    loadComponents() {

        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.options.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();
        this.timewayController = new TimewayController();

    }


    /**
     * addAllEventsListeners
     *
     */
    addAllEventsListeners() {

        // Button Close Display
        // $('.navigation-display-button-close').click(NavigationController.modalClose);


        // Keystrokes
        $('body').keypress(function (event: any) {

            let key: number = 104;  // Taste "h"

            if (event.which == key) {
                event.preventDefault();

                // Das Hilfsfenster ein / ausblenden
                $('#help-modal').modal('toggle');
            }
        });

    }

    loadTimePoints() {
        let promise = DbController.loadAllWayPoints();

        promise.then(function (doc: any) {

            aNicerWay.lastTimePoint = doc.rows.length;


            console.log(doc.rows);
            // Wenn keine Timepoints vorhanden, standart einlesen:

            if( doc.rows.length == 0){
                reset();
            }

        })

    }


    setTimePoint(point: number) {
        // Test
        this.timePointAktuell = point;
        console.log('Timepoint: ' + point);
    }


    getTimePoint() {
        return this.timePointAktuell;
    }


    getLastTimePoint() {
        return this.lastTimePoint;
    }


    getFirstTimePoint() {
        return this.firstTimePoint;
    }


    static setVersion(){

        $('.version').text(_aNicerWayVersion);
    }





}

// init
let options = {
    simulator_size: 'gross' // klein, gross
};

let aNicerWay = new ANicerWay(options);



function reset(){

    DbController.loadDefault();
    aNicerWay = new ANicerWay(options);

}