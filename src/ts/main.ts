/**
 *  aNicerWay
 *
 */
class aNicerWay {
    public className: string;

    constructor(parameters: { debug: any }) {
        let debug = parameters.debug;

        this.className = 'aNicerWay';
        console.log(this.className);

        // Debugmodus ein ?
        if (debug) {
            aNicerWay.showDebug();
        }

        // load all Controllers
        let debugDisplayController = new DebugDisplayController();
        let phoneSimController = new PhoneSimController();
        let statusDisplayController = new StatusDisplayController();
        let timewayController = new TimewayController();
        let navigationController = new NavigationController();
        let dataDisplayController = new DataDisplayController();

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
     * debug
     *
     */
    public static showDebug() {
        let elem_debug_display: any = document.getElementById('debug-display');
        let elem_status_display: any = document.getElementById('status-display');
        let elem_phone_sim: any = document.getElementById('phone-sim');
        let elem_timeway: any = document.getElementById('timeway');
        let elem_navigation: any = document.getElementById('navigation');
        let elem_data_display: any = document.getElementById('data-display');

        elem_debug_display.style.display = 'block';

        elem_debug_display.classList.add('debug');
        elem_status_display.classList.add('debug');
        elem_phone_sim.classList.add('debug');
        elem_timeway.classList.add('debug');
        elem_navigation.classList.add('debug');
        elem_data_display.classList.add('debug');

        return true;
    }


}

// init
let options = {debug: true};
let a_nicer_way = new aNicerWay(options);




