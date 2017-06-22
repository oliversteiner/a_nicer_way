/// <reference path="../definitions/jquery-scrollTo.d.ts" />


/**
 *  timewayController
 *
 */
class TimeWayController {
    private elem_Root: any;
    private elem_Content: any;
    private timeWayPointList: any;


    /**
     * constructor
     */
    constructor() {


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

    update() {
        this.generateTimeWayPoints();
    };

    setList(list: any) {
        this.timeWayPointList = list;
    };

    /**
     *
     *
     * @param target
     */
    static  scrollTo(target: string) {

        $('#timeway-content').scrollTo('#' + target, 1000);

    }

    parallax() {
        let parent_old = 0;

        function ostParallax(elem: string, faktor: string, richtung: string) {

            $(elem).css("left", richtung + "=" + faktor);
        }


        $('#timeway-content').scroll(function () {
            let richtung = '';

            let parent = $('#timeway-content').scrollLeft();


            if (parent_old < parent) {
                richtung = '+';
            } else {
                richtung = '-';
            }
            ostParallax('#layer-1-himmel', '2', richtung);
            ostParallax('#layer-2-berge', '3', richtung);
            ostParallax('#layer-3-aktiv', '5', richtung);
            ostParallax('#layer-4-baume', '6', richtung);

            parent_old = parent;
        });
    }


    generateTimeWayPoints() {

        //
        let elemNav = document.getElementById('layer-3-aktuell');

        // reset nav
        elemNav.innerHTML = '';

        // ul

        // nav > ul

        // ul > li*


        let list = this.timeWayPointList;


        if (list != null) {

            for (let i = 1, len = list.length; i < len + 1; i++) {
                let doc = list[i];

                if (doc) {
                    let div_twp = document.createElement('div');

                    // a.class
                    div_twp.setAttribute('class', 'timewaypoint');

                    // a.data-i
                    div_twp.setAttribute('id', doc._id);

                    // P
                    let p_titel = document.createElement('p');
                    p_titel.setAttribute('class', 'timewaypoint-titel');
                    let title = doc.date + ' - ' + doc.place;
                    let text_title = document.createTextNode(title);

                    // Number
                    let div_number = document.createElement('div');
                    div_number.setAttribute('class', 'timewaypoint-sequence-number');
                    let sequence = doc.sequence;
                    let text_number = document.createTextNode(sequence);

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
    }

}