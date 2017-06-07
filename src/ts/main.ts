/*
 / <reference path="controllers/debugDisplayController.ts"/>
 / <reference path="controllers/phoneSimController.ts"/>
 / <reference path="controllers/statusDisplayController.ts"/>
 / <reference path="controllers/timewayController.ts"/>
 / <reference path="controllers/navigationController.ts"/>
 */


/**
 *  aNicerWay
 *
 */
class aNicerWay {
    public className: string;

    constructor( parameters: { debug: any } ) {
        let debug = parameters.debug;

        this.className = 'aNicerWay';
        console.log(this.className);

        // Debugmodus ein ?
        if (debug) {
            aNicerWay.showDebug();
        }

        // load all Controllers
        let debug_display_controller = new debugDisplayController();
        let phone_sim_controller = new phoneSimController();
        let status_display_controller = new statusDisplayController();
        let timeway_controller = new timewayController();
        let navigation_controller = new navigationController();
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

        elem_debug_display.style.display = 'block';

        elem_debug_display.classList.add('debug');
        elem_status_display.classList.add('debug');
        elem_phone_sim.classList.add('debug');
        elem_timeway.classList.add('debug');
        elem_navigation.classList.add('debug');

        return true;
    }


}

// init
let options = {debug: true};
let a_nicer_way = new aNicerWay(options);




