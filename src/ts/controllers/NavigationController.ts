/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>
/// <reference path="../definitions/jquery-scrollTo/jquery-scrollTo.d.ts" />

/**
 *  navigationController
 *
 */


// Global
const _navigationName: string = 'navigation-display';
const _navigationContentName: string = 'navigation-display-content';

let _navigationOpen: boolean = false;

// Class
class NavigationController {

    public className: string;
    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;

    /**
     * constructor
     */
    constructor() {


        // Vars
        this.elem_Root = document.getElementById(_navigationName);
        this.elem_Content = document.getElementById(_navigationContentName);


        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#navigation-display-ready').ready(function () {
                console.log('- Navigation Display load');

                // functions
                NavigationController.modalClose()
                NavigationController.listAllWayPoints();
                NavigationController.addAllEventsListeners();
                NavigationController.makeDraggable();
                //
                console.log('- Navigation Display ready');
            }
        )


    }

    /**
     * makeDraggable
     */
    static makeDraggable() {
        $('#' + _navigationContentName).draggable();
    }

    /**
     * addAllEventsListeners
     *
     */
    static addAllEventsListeners() {

        // Button Close Display
        $('.navigation-display-button-close').click(NavigationController.modalClose);

        //
        $('.navigation-display-button-toggle').click(NavigationController.modalToggle);

        //
        $('.navigation-button-next').click(NavigationController.scrollToNext);

        //
        $('.navigation-button-previous').click(NavigationController.scrollToPreviews);


        // Keystrokes (kein jQuery weil schneller)
        document.onkeydown = function (event: any) {
            event = event || window.event;

            let key = {
                arrow_left: 37,
                arrow_right: 39,

                arrow_up: 38,
                arrow_down: 40,

                n: 78
            };


            switch (event.which || event.keyCode) {

                // Pfeil nach Links
                case key.arrow_left:
                    NavigationController.scrollToPreviews();
                    break;

                // Pfeil nach rechts
                case key.arrow_right:
                    NavigationController.scrollToNext();
                    break;


                // Pfeil nach oben
                case key.arrow_up:
                    NavigationController.scrollToFirst();
                    break;

                // Pfeil nach unten
                case key.arrow_down:
                    NavigationController.scrollToLast();
                    break;


                // N - Navigation einblenden
                case key.n:
                    console.log('n gedrückt');
                    NavigationController.modalToggle();
                    break;

                default:
                    return; // exit this handler for other keys
            }
            event.preventDefault(); // prevent the default action (scroll / move caret)
        }

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
        DataDisplayController.modalOpen();
    }

    static setSmartphoneSimContent(id: string) {
        let promise = DbController.loadWayPoint(id);
        promise.then(function (doc: any) {

            let content = doc.timewayid;
            let message = 'TimeWayPoint: <span class="message-ok">' + content + '</span>';
            SmartphoneSimController.message(message);

        });

    }


    /**
     *
     *
     */
    static modalClose() {
        _navigationOpen = false;
        $('#' + _navigationContentName).hide();
    }

    static modalOpen() {
        _navigationOpen = true;
        $('#' + _navigationContentName).show();
    }

    static modalToggle() {
        if (_navigationOpen) {
            NavigationController.modalClose();
        }
        else {
            NavigationController.modalOpen();
        }
    }


    /**
     *
     *
     * @param target
     */
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

    static scrollToFirst() {
        let first: number = aNicerWay.getFirstTimePoint();

        NavigationController.scrollToNumber(first);
        SmartphoneSimController.message('first TimePoint')

    }

    static scrollToLast() {
        let last: number = aNicerWay.getLastTimePoint();
        NavigationController.scrollToNumber(last);
        SmartphoneSimController.message('last TimePoint')

    }

}