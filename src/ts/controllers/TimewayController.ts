// Global
const _timeWayName: string = 'timeway';
const _timeWayContentName: string = 'timeway-content';


/**
 *  timewayController
 *
 */
class TimewayController {
    private elem_Root: any;
    private elem_Content: any;


    /**
     * constructor
     */
    constructor() {


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

            }
        )


    }

    static parallax() {
        let parent_old = 0;

        function ostParallax(parent: any, elem: string, faktor: string, richtung: string) {

            let child: any = $(elem).css('left');

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
            ostParallax(parent, '#layer-1-himmel', '2', richtung);
            ostParallax(parent, '#layer-2-berge', '3', richtung);
            ostParallax(parent, '#layer-3-aktiv', '5', richtung);
            ostParallax(parent, '#layer-4-baume', '6', richtung);

            parent_old = parent;
        });
    }


    static generateWayPoints() {

        // STATIC
        let elemNav = document.getElementById('layer-3-aktuell');

        // reset nav
        elemNav.innerHTML = '';

        // ul

        // nav > ul

        // ul > li*
        let promise = DbController.loadAllWayPoints();

        promise.then(function (doc: any) {

            let anzahl = doc.total_rows;
            let zeilen = doc.rows;

            $.each(zeilen, function (index, data) {
                // li
                let div_twp = document.createElement('div');

                // a.class
                div_twp.setAttribute('class', 'timeway-point');

                // a.data-i
                div_twp.setAttribute('id', data.doc._id);

                // P
                let p_titel = document.createElement('p');
                p_titel.setAttribute('class', 'timeway-point-titel');
                let title = data.doc.date + ' - ' + data.doc.place;
                let text_title = document.createTextNode(title);

                // Number
                let div_number = document.createElement('div');
                div_number.setAttribute('class', 'timeway-point-number');
                let number = data.doc.timewayid;
                let text_number = document.createTextNode(number);

                // Append
                p_titel.appendChild(text_title);
                div_number.appendChild(text_number);

                div_twp.appendChild(div_number);
                div_twp.appendChild(p_titel);

                elemNav.appendChild(div_twp);

            });
        });

    };

}