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
    NavigationController.prototype.addAllEventsListeners = function () {
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
        var elemNav = document.getElementById('navigation');
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
        DataDisplayController.loadData(id);
    };
    return NavigationController;
}());
