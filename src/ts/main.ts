let aNicerWay: any;
let _aNicerWayVersion = '1.3b';
let _lastTimePoint = 1;
let _protectedInputs = ":input, textarea";

/**
 *  aNicerWay
 *
 */
class ANicerWay {


    // Version
    public version: string = _aNicerWayVersion;

    // Status
    public timePointAktuell: number = 1;
    public firstTimePoint: number = 1;
    public lastTimePoint: number = 0;
    public isMobile: boolean = true;


    // Options
    public simulator_size: string = 'gross';
    public check_for_mobile: boolean = true;


    // Controllers
    public dbController: DbController;
    public dataDisplayController: DataDisplayController;
    public smartphoneSimController: SmartphoneSimController;
    public statusDisplayController: StatusDisplayController;
    public navigationController: NavigationController;
    public timewayController: TimewayController;
    public remoteDisplayController: RemoteDisplayController;

    /**
     *
     *
     * @param options
     */
    constructor(options?: {
        simulator_size?: string,
        check_for_mobile?: boolean
    }) {

        // Optionen
        this.simulator_size = options.simulator_size;
        this.check_for_mobile = options.check_for_mobile;

        // Optionen Default


        // Init
        this.setVersion();

        this.loadTimePoints();
        this.loadComponents();
        this.addAllEventsListeners();
        this.detectMobile();




    }

    /**
     *
     *
     */
    loadComponents() {

        this.dbController = new DbController();
        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();
        this.timewayController = new TimewayController();
        this.remoteDisplayController = new RemoteDisplayController();


    }


    /**
     * addAllEventsListeners
     *
     */
    addAllEventsListeners() {


        // Keystrokes
        $(document).keypress(function (event: any) {

            let key: number = 104;  // Taste "h"

            if (event.which === key && !$(document.activeElement).is(_protectedInputs)) {
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
            if (doc.rows.length === 0) {

                // Zeige Modal mit DB abfrage

                $('#modal-Init-DB').modal('show');

            }

            NavigationController.listAllWayPoints();

            aNicerWay.lastTimePoint = lastTimePoint;
            _lastTimePoint = lastTimePoint;

            return lastTimePoint;

        });

    }

    static updateTimePoints(){
        aNicerWay.loadTimePoints();
        TimewayController.generateWayPoints();

    }


    setTimePoint(point: number) {
        // Test

        if (point < 0) {

            this.timePointAktuell = 1;

            return false;

        } else {
            this.timePointAktuell = point;

            return true;

        }

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


    setVersion() {
        $('.version').text(this.version);
        return this.version;
    }


    detectMobile() {
        if (this.check_for_mobile) {

            $(document).ready(function () {
                let isMobile = window.matchMedia("only screen and (max-width: 760px)");

                if (isMobile.matches) {
                    //Conditional script here
                    console.log('mobile detected');

                    // speichern
                    aNicerWay.isMobile = true;

                    // Anzeige starten, ob zu Remote-Seite wechseln
                    $('#modalChangeToRemote').modal('show').on('shown.bs.modal', function () {


                        // Timer ablaufen lassen

                        let countdown = [3, 2, 1, 0];

                        const speed = 1000;
                        let timer = setInterval(lineAfterLine, speed);
                        let length = countdown.length;
                        let index = 0;

                        function lineAfterLine() {
                            let counter = countdown[index];

                            $('.go-remote-contdown-number').text(counter);

                            index++;

                            // remove timer after interating through all articles
                            if (index >= length) {
                                clearInterval(timer);
                                let pikto = '<span class="glyphicon glyphicon-sort "></span>';
                                $('.go-remote-contdown-number').html(pikto);

                                // Modal nach 4 sekunden beenden
                                $('#modalChangeToRemote').modal('hide');

                            }
                        }

                    })

                }  // isMobile
            }); // ready

            return true;

        } else {

            return false;
        }
    }


} // Class


let options = {
    simulator_size: 'gross', // klein, gross
    check_for_mobile: false // klein, gross
};


$(document).ready(function () {
    aNicerWay = new ANicerWay(options);
});


function _reset() {
    // DbController.loadDefault();
    console.log('***** reset');

    // Datenbank leeren
 //   DbController.eraseDB();

    // Datenbank neu einlesen
    DbController.loadDefault();

    // Zeige die Prozess-bar
    $('#modal-Init-DB').modal('show');

    $('.init-DB-message-wrapper').hide();
    $('.progress-wrapper').show();

    // Animiere die Prozessbar
    $('.progress-bar').each(function () {
        let $bar = $(this);
        let progress = setInterval(function () {

            let currWidth = parseInt($bar.attr('aria-valuenow'));
            let maxWidth = parseInt($bar.attr('aria-valuemax'));
            let maxtimer = maxWidth + 25;
            //update the progress
            $bar.width(currWidth + '%');
            $bar.attr('aria-valuenow', currWidth + 5);

            //clear timer when max is reach
            if (currWidth >= maxtimer) {
                clearInterval(progress);

                $('#modal-Init-DB').modal('hide');
                $('.init-DB-message-wrapper').show();
                $('.progress-wrapper').hide();
                // Seite neu initialisieren



            }

        }, 100);
    });

    return false;
}

function _update_views(){
    ANicerWay.updateTimePoints();
}
