/**
 *  consoleDisplayController
 *
 */
class StatusDisplayController {
    public elem_Root: HTMLElement | any;
    public elem_Content: HTMLElement | any;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.elem_Root = document.getElementById('status-display');
        this.elem_Content = document.getElementById('status-display-content');


        console.log('- Status Display load');

        // functions
        this.addEventListeners();

        // Tests

        // Meldung
        console.log('- Status Display  ready');


    }

    /**
     * addEventsListeners
     */
    addEventListeners() {
    }


    /**
     *
     *
     * @param id
     */
    static setData(doc: any) {


        $('#status-display-date').text(doc.date);
        $('#status-display-place').text(doc.place);
        $('#status-display-feeling').text(doc.feeling);


    }


}