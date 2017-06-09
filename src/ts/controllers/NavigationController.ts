/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>


/**
 *  navigationController
 *
 */
class NavigationController {

    public className: string;
    public idName: string;

    private elemRoot: any;
    private dbController: any;


    /**
     * constructor
     */
    constructor() {

        // Datenbankverbindung aufbauen und verfügbarmachen
        this.dbController = new DbController();

        // Eigenschaften setzen
        this.className = 'navigationController';
        this.idName = 'navigation';
        this.elemRoot = document.getElementById(this.idName);


        // functions
        NavigationController.listAllWayPoints();
        this.addAllEventsListeners();

        // debug
        console.log(this.className);
    }


    /**
     * addAllEventsListeners
     *
     */
    addAllEventsListeners() {

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
        let elemNav = document.getElementById('navigation');

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

        DataDisplayController.loadData(id);

    }


}