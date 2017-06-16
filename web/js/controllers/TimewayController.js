// Global
var _timeWayName = 'timeway';
var _timeWayContentName = 'timeway-content';
/**
 *  timewayController
 *
 */
var TimewayController = (function () {
    /**
     * constructor
     */
    function TimewayController() {
        // Vars
        this.elem_Root = document.getElementById(_timeWayName);
        this.elem_Content = document.getElementById(_timeWayContentName);
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#timeway-ready').ready(function () {
            console.log('- Timeway load');
            // Aktionen verknüpfen
            TimewayController.generateWayPoints();
            NavigationController.scrollToFirst();
            TimewayController.parallax();
            // Tests
            //
            console.log('- Timeway ready');
        });
    }
    TimewayController.parallax = function () {
        var parent_old = 0;
        function ostParallax(parent, elem, faktor, richtung) {
            var child = $(elem).css('left');
            $(elem).css("left", richtung + "=" + faktor);
        }
        $('#timeway-content').scroll(function () {
            var richtung = '';
            var parent = $('#timeway-content').scrollLeft();
            if (parent_old < parent) {
                richtung = '+';
            }
            else {
                richtung = '-';
            }
            ostParallax(parent, '#layer-1-himmel', '2', richtung);
            ostParallax(parent, '#layer-2-berge', '3', richtung);
            ostParallax(parent, '#layer-3-aktiv', '5', richtung);
            ostParallax(parent, '#layer-4-baume', '6', richtung);
            parent_old = parent;
        });
    };
    TimewayController.generateWayPoints = function () {
        // STATIC
        var elemNav = document.getElementById('layer-3-aktuell');
        // reset nav
        elemNav.innerHTML = '';
        // ul
        // nav > ul
        // ul > li*
        var promise = DbController.loadAllWayPoints();
        promise.then(function (doc) {
            var anzahl = doc.total_rows;
            var zeilen = doc.rows;
            $.each(zeilen, function (index, data) {
                // li
                var div_twp = document.createElement('div');
                // a.class
                div_twp.setAttribute('class', 'timeway-point');
                // a.data-i
                div_twp.setAttribute('id', data.doc._id);
                // Text
                var title = data.doc.timewayid + ' - ' + data.doc.date + ' - ' + data.doc.place;
                var text = document.createTextNode(title);
                div_twp.appendChild(text);
                elemNav.appendChild(div_twp);
            });
        });
    };
    ;
    return TimewayController;
}());
