
/**
 *  timewayController
 *
 */
class timewayController {
    public className: string;
    private elem: any;
    public  idName: string;

    /**
     * constructor
     */
    constructor() {
        // debug
        console.log(this.className);

        // Vars
        this.className = 'timewayController';
        this.idName = 'timeway';
        this.elem = document.getElementById(this.idName);



        // functions
        this.addAllEventsListeners();
    }

    /**
     * addAllEventsListeners
     */
    addAllEventsListeners(){
        this.elem.addEventListener('click', this.testClick.bind(this), false);
    }
    /**
     * set
     *
     */
    set() {
        // Test
        console.log(' - ' + this.className + '.set()');
    }

    /**
     * get
     *
     */
    get() {
        // Test
        console.log(' - ' + this.className + '.get()');
    }

    /**
     * testClick
     *
     */
    testClick(){
        this.get();
        $(this.elem).effect( "bounce", "slow" );

    }
}