/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>


/**
 *  navigationController
 *
 */
class NavigationController {

    public className: string;
    public idName: string;

    private elem: any;
    private dbController: any;


    /**
     * constructor
     */
    constructor() {


        this.dbController = new DbController();

        // Vars
        this.className = 'navigationController';
        this.idName = 'navigation';
        this.elem = document.getElementById(this.idName);


        // functions
        this.listAllWayPoints();
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
     *
     */
    listAllWayPoints() {


        // nav
        let nav = document.getElementById('navigation');

        // ul
        let ul = document.createElement('ul');

        // nav > ul
        nav.appendChild(ul);

        // ul > li*
        this.dbController.db.allDocs({include_docs: true, descending: true},
            function (err: any, doc: any) {

                // aus den rows eine html Liste generieren:
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
                    let text = document.createTextNode(data.doc.notice);

                    // li > a > text
                    li.appendChild(a);
                    a.appendChild(text);

                });

            });
    };

    /**
     *
     *
     */
    static  loadWayPoint(id: string) {

        console.log(id);

        DataDisplayController.loadData(id);

    }


    /**
     * get
     *
     */
    get() {
        console.log(' - ' + this.className + '.get()');
    }

}