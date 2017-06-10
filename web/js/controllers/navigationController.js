/// <reference path='DbController.ts'/>
/// <reference path='DataDisplayController.ts'/>
/**
 *  navigationController
 *
 */
var NavigationController = (function () {
    /**
     * constructor
     */
    function NavigationController() {
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
    NavigationController.prototype.madeDraggable = function () {
        $(this.elem_Root).draggable();
    };
    /**
     * addAllEventsListeners
     *
     */
    NavigationController.prototype.addAllEventsListeners = function () {
        // Button Close Display
        var buttonCloseDisplay = document.getElementById('navigation-button-close');
        buttonCloseDisplay.addEventListener('click', this.closeDisplay.bind(this), false);
        // Button Show Display
        var buttonShowDisplay = document.getElementById('navigation-button-toggle');
        buttonShowDisplay.addEventListener('click', this.toggleDisplay.bind(this), false);
        // Button Show Display
        var nextTimePoint = document.getElementById('button-next');
        nextTimePoint.addEventListener('click', NavigationController.scrollToNext, false);
        // Button Show Display
        var prevTimePoint = document.getElementById('button-previous');
        prevTimePoint.addEventListener('click', NavigationController.scrollToPreviews, false);
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
    NavigationController.prototype.closeDisplay = function () {
        this.displayActive = false;
        $(this.elem_Root).hide();
        $(this.elem_button_toggle).text('Show Navigation');
    };
    NavigationController.prototype.showDisplay = function () {
        this.displayActive = true;
        $(this.elem_Root).show();
        $(this.elem_button_toggle).text('Hide Navigation');
    };
    NavigationController.prototype.toggleDisplay = function () {
        if (this.displayActive) {
            this.closeDisplay();
        }
        else {
            this.showDisplay();
        }
        return false;
    };
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
