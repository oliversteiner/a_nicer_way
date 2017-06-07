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
    NavigationController.prototype.addAllEventsListeners = function () {
    };
    /**
     * listAllWayPoints
     *
     */
    NavigationController.prototype.listAllWayPoints = function () {
        // nav
        var nav = document.getElementById('navigation');
        // ul
        var ul = document.createElement('ul');
        // nav > ul
        nav.appendChild(ul);
        // ul > li*
        this.dbController.db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
            // aus den rows eine html Liste generieren:
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
                var text = document.createTextNode(data.doc.notice);
                // li > a > text
                li.appendChild(a);
                a.appendChild(text);
            });
        });
    };
    ;
    /**
     *
     *
     */
    NavigationController.loadWayPoint = function (id) {
        console.log(id);
        DataDisplayController.loadData(id);
    };
    /**
     * get
     *
     */
    NavigationController.prototype.get = function () {
        console.log(' - ' + this.className + '.get()');
    };
    return NavigationController;
}());
