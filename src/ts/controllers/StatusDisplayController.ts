/**
 *  consoleDisplayController
 *
 */
// Global
const _statusDisplayName: string = 'status-display';
const _statusDisplayContentName: string = 'status-display-content';

class StatusDisplayController {
    public elem_Content: HTMLElement;
    public className: string;
    private elem_Root: any;
    public idName: string;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.className = 'statusDisplayController';
        this.idName = 'status-display';
        this.elem_Root = document.getElementById(_statusDisplayName);
        this.elem_Content = document.getElementById(_statusDisplayContentName);


        // Views laden
        $(this.elem_Root).load('../views/status_display.html'); // aus dem View-Verzeichnis laden, und gleich ausblenden


        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#status-display-ready').ready(function () {
                console.log('- Status Display load');


                // functions
                StatusDisplayController.addAllEventsListeners();

                // Tests

                //
                console.log('- Status Display  ready');

            }
        )


    }

    /**
     * addAllEventsListeners
     */
    static  addAllEventsListeners() {
    }


    /**
     *
     *
     * @param id
     */
    static setData(id: string) {

        let promise = DbController.loadWayPoint(id);
        promise.then(function (doc: any) {

            $('#status-display-date').text(doc.date);
            $('#status-display-place').text(doc.place);
            $('#status-display-feeling').text(doc.feeling);

        });


    }


}