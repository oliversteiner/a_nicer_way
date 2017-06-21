/// <reference path='../ANicerWay.ts'/>
/// <reference path='DataDisplayController.ts'/>
/// <reference path="../definitions/jquery-scrollTo.d.ts" />

// Global
let _navigationOpen: boolean = false;

/**
 *  navigationController
 *
 */
class NavigationController {

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;
    public timeWayPointList: any;

    /**
     * constructor
     */
    constructor() {


        // Vars
        this.elem_Root = document.getElementById('navigation-display-container');
        this.elem_Content = document.getElementById('navigation-display-content');

        console.log('- Navigation Display load');


        // functions
        this.addEventListeners();
        this.addKeystrokes();
        this.makeDraggable();
        //
        console.log('- Navigation Display ready');


    }

    /**
     * makeDraggable
     */
    makeDraggable() {
        $(this.elem_Content).draggable();
    }

    /**
     * addEventsListeners
     *
     */
    addEventListeners() {

        // Button Close Display
        $('.navigation-display-button-close').click(NavigationController.modalClose);

        //
        $('.navigation-display-button-toggle').click(NavigationController.modalToggle);



    }

    addKeystrokes() {

        // Navigation Display einblenden
        key('n', function () {
            RemoteDisplayController.openModalCenterRemote();
        });


    }

    update() {
        this.generateNavigationList();
    };


    /**
     * generateNavigationList
     * - Listet alle Waypoints als klickbare Nav-Liste auf
     *
     * - Statische Funktion, kann direkt im aufgerufen werden
     *
     */
    generateNavigationList() {

        // STATIC
        let elemNav = document.getElementById('navigation-content');

        // reset nav
        elemNav.innerHTML = '';

        // ul
        let ul = document.createElement('ul');

        // nav > ul
        elemNav.appendChild(ul);

        // ul > li*


        let list = this.timeWayPointList;


        if (list) {


            for (let i = 1, len = list.length; i < len + 1; i++) {
                let doc = list[i];

                if (doc) {
                    // li
                    let li = document.createElement('li');
                    ul.appendChild(li);

                    // a
                    let a = document.createElement('a');

                    // a.class
                    a.setAttribute('class', 'timeWayPoint-list');

                    // a.data-id
                    a.setAttribute('data-id', doc._id);

                    // a.click(func)
                    a.setAttribute('onclick', 'NavigationController.goTo(\'' + doc._id + '\')');
                    a.setAttribute('ondblclick', 'NavigationController.showDataDisplay(\'' + doc._id + '\')');

                    // Text
                    let title = doc.sequence + ' - ' + doc.date + ' - ' + doc.place;
                    let text = document.createTextNode(title);

                    // li > a > text
                    li.appendChild(a);
                    a.appendChild(text);
                }
            }

        } else {
            console.log('generateNavigationList -- Leere Liste');
        }


    };

    /**
     * loadWayPoint
     *
     * @param id
     *
     */
    static goTo(id: string) {

        aNicerWay.goTo(id);

    }

    static showDataDisplay(id: string) {
        DataDisplayController.modalOpen();
        aNicerWay.goTo(id);
    }


    /**
     *
     *
     */
    static modalClose() {
        _navigationOpen = false;
        $('#navigation-display-content').hide();
    }

    static modalOpen() {
        _navigationOpen = true;
        $('#navigation-display-content').show();
    }

    static modalToggle() {
        if (_navigationOpen) {
            NavigationController.modalClose();
        }
        else {
            NavigationController.modalOpen();
        }
    }


    setList(list: any) {
        this.timeWayPointList = list;
    };

}