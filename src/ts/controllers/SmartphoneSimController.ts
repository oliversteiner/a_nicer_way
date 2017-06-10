/**
 *  SmartphoneSimController
 *
 */
class SmartphoneSimController {
    public className: string;
    public idName: string;
    public isOpen: boolean;

    // DOM
    private elem_Root: any;
    private elem_console: any;
    private elem_Home: any;
    private elem_Close: any;
    private elem_Screen: any;
    private elem_Frame: any;


    /**
     * constructor
     */
    constructor() {
        console.log(this.className);


        // Vars
        this.isOpen = false;
        this.className = 'SmartphoneSimController';
        this.idName = 'smartphone-sim';
        this.elem_Root = document.getElementById(this.idName);
        this.elem_Frame = document.getElementById('smartphone-frame');

        this.elem_console = document.getElementById('smartphone-console');
        this.elem_Home = document.getElementById('smartphone-home-button');
        this.elem_Close = document.getElementById('smartphone-close');
        this.elem_Screen = document.getElementById('smartphone-screen');


        // functions
        this.addAllEventsListeners();
        $(this.elem_Frame).draggable();

        // blinkender Cursor

    }

    /**
     * addAllEventsListeners
     */
    addAllEventsListeners() {
        // this.elem_Home.addEventListener('click', this.home.bind(this), false);
        this.elem_Close.addEventListener('click', this.toggle.bind(this), false);
        // $('body').on('click', '#smartphone-home-button', this.home());

    }

    home() {
        console.log('Homebutton gedrückt');
        $(this.elem_console).text('Home');
    }

    close() {
        console.log('SmartponeSim: Close');
        this.isOpen = false;
        $(this.elem_Root).addClass('smartphone-close');
        $('#smartphone-close-icon').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');

    }

    open() {
        console.log('SmartponeSim: Open');
        this.isOpen = true;
        $(this.elem_Root).removeClass('smartphone-close');

        $('#smartphone-close-icon').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
        $(".console-cursor").effect("pulsate", {times: 10}, 20000);

    }

    toggle() {
        console.log('SmartponeSim: toggle');

        if (this.isOpen) {
            this.close()
        } else {
            this.open();
        }
    }

    static setContent(content: any) {

        let elem_Content = document.getElementById('smartphone-console')
        $(elem_Content).html(content);
    }


}