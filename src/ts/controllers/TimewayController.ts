
/**
 *  timewayController
 *
 */
class TimewayController {
    public className: string;
    private elem_Root: any;
    public  idName: string;

    /**
     * constructor
     */
    constructor() {
        console.log(this.className);


        // Vars
        this.className = 'timewayController';
        this.idName = 'timeway';
        this.elem_Root = document.getElementById(this.idName);



        // functions
        this.addAllEventsListeners();

        // console
    }

    /**
     * addAllEventsListeners
     */
    addAllEventsListeners(){
    }


}