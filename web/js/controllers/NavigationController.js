/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>
/// <reference path="../definitions/jquery-scrollTo/jquery-scrollTo.d.ts" />
/**
 *  navigationController
 *
 */
// Global
var _navigationName = 'navigation-display';
var _navigationContentName = 'navigation-display-content';
var _navigationOpen = false;
// Class
var NavigationController = (function () {
    /**
     * constructor
     */
    function NavigationController() {
        // Vars
        this.elem_Root = document.getElementById(_navigationName);
        this.elem_Content = document.getElementById(_navigationContentName);
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#navigation-display-ready').ready(function () {
            console.log('- Navigation Display load');
            // functions
            NavigationController.modalClose();
            NavigationController.listAllWayPoints();
            NavigationController.addAllEventsListeners();
            NavigationController.makeDraggable();
            //
            console.log('- Navigation Display ready');
        });
    }
    /**
     * makeDraggable
     */
    NavigationController.makeDraggable = function () {
        $('#' + _navigationContentName).draggable();
    };
    /**
     * addAllEventsListeners
     *
     */
    NavigationController.addAllEventsListeners = function () {
        // Button Close Display
        $('.navigation-display-button-close').click(NavigationController.modalClose);
        //
        $('.navigation-display-button-toggle').click(NavigationController.modalToggle);
        //
        $('.navigation-button-next').click(NavigationController.scrollToNext);
        //
        $('.navigation-button-previous').click(NavigationController.scrollToPreviews);
        // Keystrokes (kein jQuery weil schneller)
        document.onkeydown = function (event) {
            event = event || window.event;
            if (!$(document.activeElement).is(_protectedInputs)) {
                var key = {
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
        };
    };
    /**
     * listAllWayPoints
     * - Listet alle Waypoints als klickbare Nav-Liste auf
     *
     * - Statische Funktion, kann direkt im aufgerufen werden
     *
     */
    NavigationController.listAllWayPoints = function () {
        // STATIC
        var elemNav = document.getElementById('navigation-content');
        // reset nav
        elemNav.innerHTML = '';
        // ul
        var ul = document.createElement('ul');
        // nav > ul
        elemNav.appendChild(ul);
        // ul > li*
        var promise = DbController.loadAllWayPoints();
        promise.then(function (doc) {
            var anzahl = doc.total_rows;
            var zeilen = doc.rows;
            $.each(zeilen, function (index, data) {
                // li
                var li = document.createElement('li');
                ul.appendChild(li);
                // a
                var a = document.createElement('a');
                // a.class
                a.setAttribute('class', 'waypoint-list');
                // a.data-id
                a.setAttribute('data-id', data.doc._id);
                // a.click(func)
                a.setAttribute('onclick', 'NavigationController.loadWayPoint(\'' + data.doc._id + '\')');
                a.setAttribute('ondblclick', 'NavigationController.showDataDisplay(\'' + data.doc._id + '\')');
                // Text
                var title = data.doc.timewayid + ' - ' + data.doc.date + ' - ' + data.doc.place;
                var text = document.createTextNode(title);
                // li > a > text
                li.appendChild(a);
                a.appendChild(text);
            });
        });
    };
    ;
    /**
     * loadWayPoint
     *
     * @param id
     *
     */
    NavigationController.loadWayPoint = function (id) {
        console.log('NavigationController.loadWaypoint');
        console.log('-' + id);
        DataDisplayController.setData(id);
        StatusDisplayController.setData(id);
        NavigationController.setSmartphoneSimContent(id);
        NavigationController.scrollToTarget(id);
    };
    NavigationController.showDataDisplay = function (id) {
        DataDisplayController.setData(id);
        DataDisplayController.modalOpen();
    };
    NavigationController.setSmartphoneSimContent = function (id) {
        var promise = DbController.loadWayPoint(id);
        promise.then(function (doc) {
            var content = doc.timewayid;
            var message = 'TimeWayPoint: <span class="message-ok">' + content + '</span>';
            SmartphoneSimController.message(message);
        });
    };
    /**
     *
     *
     */
    NavigationController.modalClose = function () {
        _navigationOpen = false;
        $('#' + _navigationContentName).hide();
    };
    NavigationController.modalOpen = function () {
        _navigationOpen = true;
        $('#' + _navigationContentName).show();
    };
    NavigationController.modalToggle = function () {
        if (_navigationOpen) {
            NavigationController.modalClose();
        }
        else {
            NavigationController.modalOpen();
        }
    };
    /**
     *
     *
     * @param target
     */
    NavigationController.scrollToTarget = function (target) {
        console.log('target:' + target);
        var promise = DbController.loadWayPoint(target);
        promise.then(function (doc) {
            var point = doc.timewayid;
            aNicerWay.setTimePoint(point);
        });
        $('#timeway-content').scrollTo('#' + target, 1000);
    };
    NavigationController.scrollToNumber = function (point) {
        var target = 'TimeWayPoint-' + point;
        $('#timeway-content').scrollTo('#' + target, 1000);
        aNicerWay.setTimePoint(point);
        NavigationController.setSmartphoneSimContent(target);
        StatusDisplayController.setData(target);
    };
    NavigationController.scrollToNext = function () {
        var point = aNicerWay.getTimePoint();
        var next = point + 1;
        NavigationController.scrollToNumber(next);
    };
    NavigationController.scrollToPreviews = function () {
        var point = aNicerWay.getTimePoint();
        var prev = point - 1;
        NavigationController.scrollToNumber(prev);
    };
    NavigationController.scrollToFirst = function () {
        var first = aNicerWay.getFirstTimePoint();
        NavigationController.scrollToNumber(first);
        SmartphoneSimController.message('first TimePoint');
    };
    NavigationController.scrollToLast = function () {
        var last = aNicerWay.getLastTimePoint();
        NavigationController.scrollToNumber(last);
        SmartphoneSimController.message('last TimePoint');
    };
    return NavigationController;
}());
