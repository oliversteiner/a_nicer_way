/**
 *  consoleDisplayController
 *
 */
class StatusDisplayController {
    public className: string;
    private elemRoot: any;
    public idName: string;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.className = 'statusDisplayController';
        this.idName = 'status-display';
        this.elemRoot = document.getElementById(this.idName);

        // functions
        this.addAllEventsListeners();

        // console
        console.log(this.className);
    }

    /**
     * addAllEventsListeners
     */
    addAllEventsListeners() {
        this.elemRoot.addEventListener('click', this.testClick.bind(this), false);
    }


    static setData(id: string) {

        let promise = DbController.loadWayPoint(id);
        promise.then(function (doc: any) {

            $('#Date_status').text(doc.date);
            $('#Place_status').text(doc.place);
            $('#Feeling_status').text(doc.feeling);

        });


    }


    /**
     * get
     *
     */
    get() {
        console.log(' - ' + this.className + '.get()');
    }

    /**
     * testClick
     *
     */
    testClick() {
        this.get();
        $(this.elemRoot).effect("bounce", "slow");

    }
}