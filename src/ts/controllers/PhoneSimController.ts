
/**
 *  phoneSimController
 *
 */
class PhoneSimController {
    public className: string;
    private elem: any;
    public  idName: string;

    /**
     * constructor
     */
    constructor() {


        // Vars
        this.className = 'phoneSimController';
        this.idName = 'phone-sim';
        this.elem = document.getElementById(this.idName);



        // functions
        this.addAllEventsListeners();

        // debug
        console.log(this.className);
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