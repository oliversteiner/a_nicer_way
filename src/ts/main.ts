let aNicerWay: any;
let _aNicerWayVersion = '1.2b';
let _lastTimePoint = 0;

/**
 *  aNicerWay
 *
 */
class ANicerWay {

    public version: string = _aNicerWayVersion;
    public timePointAktuell = 0;
    public firstTimePoint = 1;
    public lastTimePoint: number = 0;


    public dbController: DbController;
    public dataDisplayController: DataDisplayController;
    public smartphoneSimController: SmartphoneSimController;
    public statusDisplayController: StatusDisplayController;
    public navigationController: NavigationController;
    public timewayController: TimewayController;

    public options: any;

    constructor(options?: { simulator_size?: string }) {
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
    loadComponents() {

        this.dbController = new DbController();
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
        console.log('loadTimePoints');
        let promise = DbController.loadAllWayPoints();

        return promise.then(function (doc: any) {

            let lastTimePoint = doc.rows.length;
             _lastTimePoint = doc.rows.length;


            // Wenn keine Timepoints vorhanden, standart einlesen:
            if (doc.rows.length == 0) {
                reset();
            }

            aNicerWay.lastTimePoint = lastTimePoint;
            _lastTimePoint = lastTimePoint;

            return lastTimePoint;

        });

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


    static setVersion() {

        $('.version').text(_aNicerWayVersion);
    }


}


function reset() {

    let options = {
        simulator_size: 'gross' // klein, gross
    };


    DbController.loadDefault();
    let aNicerWay = new ANicerWay(options);

}


$(document).ready(function () {
    let options = {
        simulator_size: 'gross' // klein, gross
    };


    aNicerWay = new ANicerWay(options);

});
