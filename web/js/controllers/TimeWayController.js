/// <reference path="../definitions/jquery-scrollTo.d.ts" />
// Global
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
        this.scroll_direction = 'right';
        this.time_to_scroll = 3000;
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
        $('#timeway-content').scrollTo('#' + target, aNicerWay.timeWayController.time_to_scroll);
    };
    TimeWayController.prototype.parallax = function () {
        var parent_old = 0;
        function ostParallax(elem, faktor, richtung) {
            // $(elem).css("left", richtung + "=" + faktor);
            //  $('.parallax-front').css("left", richtung + "=" + 0.3);
        }
        function ostParallax2(richtung_vorzeichen) {
            var elements = document.getElementsByClassName('parallax-front');
            for (var i = 0; i < elements.length; i++) {
                var position = $(elements[i]).position();
                var position_original = position.left;
                var postition_new = position_original + 1;
                var position_translate = postition_new + 'px';
                elements[i].style.transformStyle = 'preserve-3d';
                elements[i].style.transform = 'translateX(' + position_translate + ')';
            }
        }
        $('#timeway-content').scroll(function () {
            var richtung_vorzeichen = '';
            var parent = $('#timeway-content').scrollLeft();
            if (parent_old < parent) {
                richtung_vorzeichen = '+';
                aNicerWay.timeWayController.scroll_direction = 'right';
            }
            else {
                richtung_vorzeichen = '-';
                aNicerWay.timeWayController.scroll_direction = 'left';
            }
            // ostParallax('#layer-1-himmel', '2', richtung);
            // ostParallax('#layer-2-berge', '3', richtung);
            // ostParallax('#layer-3-aktiv', '5', richtung);
            // ostParallax('#layer-4-baume', '6', richtung);
            ostParallax2(richtung_vorzeichen);
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
                    div_twp.setAttribute('class', 'timewaypoint timewaypoint-images ' + doc.image);
                    // a.data-i
                    div_twp.setAttribute('id', doc._id);
                    if (doc.width > 0) {
                        // div_twp.setAttribute('style', 'width : '+ doc.width);
                        div_twp.style.width = doc.width;
                    }
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
                    // Elemente im vordergrund
                    var div_parallax_front = document.createElement('div');
                    div_parallax_front.setAttribute('class', 'parallax-front');
                    div_parallax_front.style.backgroundImage = 'url("/images/' + doc.imageForeground + '")';
                    // Elemente im hintergrund
                    var div_parallax_back = document.createElement('div');
                    div_parallax_back.setAttribute('class', 'parallax-back');
                    div_parallax_back.style.backgroundImage = 'url("/images/' + doc.imageBackground + '")';
                    // Append
                    p_titel.appendChild(text_title);
                    //  div_number.appendChild(text_number);
                    div_twp.appendChild(div_parallax_front);
                    div_twp.appendChild(div_parallax_back);
                    //  div_twp.appendChild(div_number);
                    //  div_twp.appendChild(p_titel);
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
