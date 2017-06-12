/**
 *  aNicerWay
 *
 */
class ANicerWay {
    public className: string;
    public timePointAktuell = 1;
    public dataDisplayController: any;
    public smartphoneSimController: any;
    public statusDisplayController: any;
    public navigationController: any;
    public options: any;

    constructor(options?: { simulator_size?: string }) {
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
    loadComponents() {

        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.options.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();

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

            let key:number = 104;  // Taste "h"

            if(event.which == key){
                event.preventDefault();

                // Das Hilfsfenster ein / ausblenden
                $('#help-modal').modal('toggle');
            }
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


}

// init
let options = {
    simulator_size: 'gross' // ohne, klein, gross
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



}, 2000);