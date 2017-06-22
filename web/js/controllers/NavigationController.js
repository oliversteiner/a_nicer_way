/// <reference path='../ANicerWay.ts'/>
/// <reference path='DataDisplayController.ts'/>
/// <reference path="../definitions/jquery-scrollTo.d.ts" />
// Global
var _navigationOpen = false;
/**
 *  navigationController
 *
 */
var NavigationController = (function () {
    /**
     * constructor
     */
    function NavigationController() {
        // Vars
        this.elem_Root = document.getElementById('navigation-display-container');
        this.elem_Content = document.getElementById('navigation-display-content');
        console.log('- Navigation Display load');
        // functions
        this.addEventListeners();
        //
        console.log('- Navigation Display ready');
    }
    /**
     * addEventsListeners
     *
     */
    NavigationController.prototype.addEventListeners = function () {
    };
    NavigationController.prototype.update = function () {
        this.generateNavigationList();
    };
    ;
    /**
     * generateNavigationList
     * - Listet alle Waypoints als klickbare Nav-Liste auf
     *
     * - Statische Funktion, kann direkt im aufgerufen werden
     *
     */
    NavigationController.prototype.generateNavigationList = function () {
        // STATIC
        var elemNav = document.getElementById('navigation-content');
        // reset nav
        elemNav.innerHTML = '';
        // ul
        var ul = document.createElement('ul');
        // nav > ul
        elemNav.appendChild(ul);
        // ul > li*
        var list = this.timeWayPointList;
        if (list) {
            for (var i = 1, len = list.length; i < len + 1; i++) {
                var doc = list[i];
                if (doc) {
                    // li
                    var li = document.createElement('li');
                    ul.appendChild(li);
                    // a
                    var a = document.createElement('a');
                    // a.class
                    a.setAttribute('class', 'timeWayPoint-list');
                    // a.data-id
                    a.setAttribute('data-id', doc._id);
                    // a.click(func)
                    a.setAttribute('onclick', 'NavigationController.goTo(\'' + doc._id + '\')');
                    a.setAttribute('ondblclick', 'NavigationController.showDataDisplay(\'' + doc._id + '\')');
                    // Text
                    var title = doc.sequence + ' - ' + doc.date + ' - ' + doc.place;
                    var text = document.createTextNode(title);
                    // li > a > text
                    li.appendChild(a);
                    a.appendChild(text);
                }
            }
        }
        else {
            console.log('generateNavigationList -- Leere Liste');
        }
    };
    ;
    /**
     * loadWayPoint
     *
     * @param id
     *
     */
    NavigationController.goTo = function (id) {
        aNicerWay.goTo(id);
    };
    NavigationController.showDataDisplay = function (id) {
        $('#data-display-content').show();
        aNicerWay.goTo(id);
    };
    NavigationController.prototype.setList = function (list) {
        this.timeWayPointList = list;
    };
    ;
    return NavigationController;
}());
