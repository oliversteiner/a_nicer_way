/// <reference path="../definitions/jquery-scrollTo.d.ts" />
/**
 *  timewayController
 *
 */
var TimeWayController = (function () {
    /**
     * constructor
     */
    function TimeWayController() {
        // Vars
        this.elem_Root = document.getElementById('timeway-container');
        this.elem_Content = document.getElementById('timeway-content');
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        console.log('- Timeway load');
        // Aktionen verknüpfen
        this.parallax();
        // Tests
        //
        console.log('- Timeway ready');
    }
    TimeWayController.prototype.update = function () {
        this.generateTimeWayPoints();
    };
    ;
    TimeWayController.prototype.setList = function (list) {
        this.timeWayPointList = list;
    };
    ;
    /**
     *
     *
     * @param target
     */
    TimeWayController.scrollTo = function (target) {
        $('#timeway-content').scrollTo('#' + target, 1000);
    };
    TimeWayController.prototype.parallax = function () {
        var parent_old = 0;
        function ostParallax(elem, faktor, richtung) {
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
            ostParallax('#layer-1-himmel', '2', richtung);
            ostParallax('#layer-2-berge', '3', richtung);
            ostParallax('#layer-3-aktiv', '5', richtung);
            ostParallax('#layer-4-baume', '6', richtung);
            parent_old = parent;
        });
    };
    TimeWayController.prototype.generateTimeWayPoints = function () {
        //
        var elemNav = document.getElementById('layer-3-aktuell');
        // reset nav
        elemNav.innerHTML = '';
        // ul
        // nav > ul
        // ul > li*
        var list = this.timeWayPointList;
        if (list != null) {
            for (var i = 1, len = list.length; i < len + 1; i++) {
                var doc = list[i];
                if (doc) {
                    var div_twp = document.createElement('div');
                    // a.class
                    div_twp.setAttribute('class', 'timewaypoint');
                    // a.data-i
                    div_twp.setAttribute('id', doc._id);
                    // P
                    var p_titel = document.createElement('p');
                    p_titel.setAttribute('class', 'timewaypoint-titel');
                    var title = doc.date + ' - ' + doc.place;
                    var text_title = document.createTextNode(title);
                    // Number
                    var div_number = document.createElement('div');
                    div_number.setAttribute('class', 'timewaypoint-sequence-number');
                    var sequence = doc.sequence;
                    var text_number = document.createTextNode(sequence);
                    // Append
                    p_titel.appendChild(text_title);
                    div_number.appendChild(text_number);
                    div_twp.appendChild(div_number);
                    div_twp.appendChild(p_titel);
                    elemNav.appendChild(div_twp);
                }
            }
        }
        else {
            console.log('leere Liste');
        }
    };
    return TimeWayController;
}());
