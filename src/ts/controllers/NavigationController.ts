/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>


/**
 *  navigationController
 *
 */
class NavigationController {

    public className: string;
    public idName: string;

    private dbController: any;

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;
    private elem_button_toggle: HTMLElement | any;

    private displayActive: boolean;


    /**
     * constructor
     */
    constructor() {
        console.log(this.className);

        // Datenbankverbindung aufbauen und verfügbarmachen
        this.dbController = new DbController();

        // Eigenschaften setzen
        this.className = 'navigationController';
        this.idName = 'navigation';
        this.elem_Root = document.getElementById('navigation');
        this.elem_Content = document.getElementById('navigation-content');
        this.elem_button_toggle = document.getElementById('navigation-button-toggle');
        this.displayActive = false;


        // functions
        this.madeDraggable();

        NavigationController.listAllWayPoints();
        this.addAllEventsListeners();

    }

    /**
     * madeDraggable
     */
    madeDraggable() {
        $(this.elem_Root).draggable();
    }

    /**
     * addAllEventsListeners
     *
     */
    addAllEventsListeners() {

        // Button Close Display
        let buttonCloseDisplay = document.getElementById('navigation-button-close');
        buttonCloseDisplay.addEventListener('click', this.closeDisplay.bind(this), false);

        // Button Show Display
        let buttonShowDisplay = document.getElementById('navigation-button-toggle');
        buttonShowDisplay.addEventListener('click', this.toggleDisplay.bind(this), false);

        // Button Show Display
        let nextTimePoint = document.getElementById('button-next');
        nextTimePoint.addEventListener('click', NavigationController.scrollToNext, false);

        // Button Show Display
        let prevTimePoint = document.getElementById('button-previous');
        prevTimePoint.addEventListener('click', NavigationController.scrollToPreviews, false);


    }


    /**
     * listAllWayPoints
     * - Listet alle Waypoints als klickbare Nav-Liste auf
     *
     * - Statische Funktion, kann direkt im aufgerufen werden
     *
     */
    static listAllWayPoints() {

        // STATIC
        let elemNav = document.getElementById('navigation-content');

        // reset nav
        elemNav.innerHTML = '';

        // ul
        let ul = document.createElement('ul');

        // nav > ul
        elemNav.appendChild(ul);

        // ul > li*
        let promise = DbController.loadAllWayPoints();

        promise.then(function (doc: any) {

            let anzahl = doc.total_rows;
            let zeilen = doc.rows;

            $.each(zeilen, function (index, data) {

                // li
                let li = document.createElement('li');
                ul.appendChild(li);

                // a
                let a = document.createElement('a');

                // a.class
                a.setAttribute('class', 'waypoint-list');

                // a.data-id
                a.setAttribute('data-id', data.doc._id);

                // a.click(func)
                a.setAttribute('onclick', 'NavigationController.loadWayPoint(\'' + data.doc._id + '\')');
                a.setAttribute('ondblclick', 'NavigationController.showDataDisplay(\'' + data.doc._id + '\')');

                // Text
                let title = data.doc.timewayid + ' - ' + data.doc.date + ' - ' + data.doc.place;
                let text = document.createTextNode(title);

                // li > a > text
                li.appendChild(a);
                a.appendChild(text);
            });
        });

    };

    /**
     * loadWayPoint
     *
     * @param id
     *
     */
    static loadWayPoint(id: string) {

        console.log('NavigationController.loadWaypoint');
        console.log('-' + id);

        DataDisplayController.setData(id);
        StatusDisplayController.setData(id);
        NavigationController.setSmartphoneSimContent(id);
        NavigationController.scrollToTarget(id);

    }

    static showDataDisplay(id: string) {

        DataDisplayController.setData(id);
        $('#data-display').show();

    }

    static setSmartphoneSimContent(id: string) {
        let promise = DbController.loadWayPoint(id);
        promise.then(function (doc: any) {

            let content = doc.timewayid;
            SmartphoneSimController.setContent(content);

        });

    }


    closeDisplay() {
        this.displayActive = false;

        $(this.elem_Root).hide();
        $(this.elem_button_toggle).text('Show Navigation');
    }

    showDisplay() {
        this.displayActive = true;

        $(this.elem_Root).show();
        $(this.elem_button_toggle).text('Hide Navigation');
    }

    toggleDisplay() {
        if (this.displayActive) {
            this.closeDisplay();
        }
        else {
            this.showDisplay();
        }
        return false;
    }

    static  scrollToTarget(target: string) {

        console.log('target:' + target);

        let promise = DbController.loadWayPoint(target);
        promise.then(function (doc: any) {

            let point = doc.timewayid;
            aNicerWay.setTimePoint(point);

        });

        $('#timeway-content').scrollTo('#' + target, 1000);

    }

    static  scrollToNumber(point: number) {
        let target = 'TimeWayPoint-' + point;
        $('#timeway-content').scrollTo('#' + target, 1000);
        aNicerWay.setTimePoint(point);
        NavigationController.setSmartphoneSimContent(target);
        StatusDisplayController.setData(target);

    }


    static scrollToNext() {
        let point: number = aNicerWay.getTimePoint();

        let next = point + 1;
        NavigationController.scrollToNumber(next);

    }

    static scrollToPreviews() {
        let point: number = aNicerWay.getTimePoint();

        let prev = point - 1;
        NavigationController.scrollToNumber(prev);

    }

}