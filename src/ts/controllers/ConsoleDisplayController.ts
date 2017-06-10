/**
 *  consoleDisplayController
 *
 */
class ConsoleDisplayController {
    public className: string;
    public  idName: string;
    private elem_Root: HTMLElement;

    /**
     * constructor
     */
    constructor() {


        // Vars
        this.className = 'ConsoleDisplayController';
        this.idName = 'console-display';
        this.elem_Root = document.getElementById(this.idName);



        // functions
        this.addAllEventsListeners();

        // console
        console.log(this.className);
    }

    /**
     * addAllEventsListeners
     */
    addAllEventsListeners(){
        this.elem_Root.addEventListener('click', this.testClick.bind(this), false);
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
        $(this.elem_Root).effect( "bounce", "slow" );

    }
}