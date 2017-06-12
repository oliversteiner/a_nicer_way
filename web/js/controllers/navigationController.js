/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>
/// <reference path="../definitions/jquery-scrollTo/jquery-scrollTo.d.ts" />
/**
 *  navigationController
 *
 */
// Global
var _navigationDisplayName = 'navigation';
var _navigationDisplayContentName = 'navigation-content';
var _navigationModalOpen = false;
// Class
var NavigationController = (function () {
    /**
     * constructor
     */
    function NavigationController() {
        // Vars
        this.elem_Root = document.getElementById(_navigationDisplayName);
        this.elem_Content = document.getElementById(_navigationDisplayContentName);
        // Views laden
        $(this.elem_Root).load('../views/navigation_display.html');
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#navigation-display-ready').ready(function () {
            console.log('- Navigation Display load');
            // functions
            NavigationController.addAllEventsListeners();
            NavigationController.listAllWayPoints();
            NavigationController.makeDraggable();
            // Tests
            // Meldung
            console.log('- Navigation Display  ready');
        });
    }
    /**
     * makeDraggable
     */
    NavigationController.makeDraggable = function () {
        $('#' + _navigationDisplayContentName).draggable();
    };
    /**
     * addAllEventsListeners
     *
     */
    NavigationController.addAllEventsListeners = function () {
        //
        $('#navigation-button-close').click(NavigationController.modalClose);
        //
        $('#navigation-button-toggle').click(NavigationController.toggleDisplay);
        //
        $('#button-next').click(NavigationController.scrollToNext);
        //
        $('#button-previous').click(NavigationController.scrollToPreviews);
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
        $('#data-display').show();
    };
    NavigationController.setSmartphoneSimContent = function (id) {
        var promise = DbController.loadWayPoint(id);
        promise.then(function (doc) {
            var content = doc.timewayid;
            SmartphoneSimController.setContent(content);
        });
    };
    /**
     *
     *
     */
    NavigationController.modalClose = function () {
        _navigationModalOpen = false;
        $('#' + _navigationDisplayContentName).hide();
    };
    NavigationController.modalOpen = function () {
        _navigationModalOpen = true;
        $('#' + _navigationDisplayContentName).show();
    };
    NavigationController.toggleDisplay = function () {
        if (_navigationModalOpen) {
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
    return NavigationController;
}());
