class DisplayController {


    constructor() {

        this.searchDisplays();


    }


    searchDisplays() {


        let displayListe = $('.nicer-display');


        console.log('++++++++');
        console.log(displayListe);


        for (let i = 0; i < displayListe.length; i++) {


            let display_ID = $(displayListe[i]).attr('id');
            let display_Key = $(displayListe[i]).data('keystroke');


            this.activate(display_ID, display_Key);

        }


    }


    activate(display_id: string, display_Key?: string) {


        let $display = $('#' + display_id);
        let display_name = display_id.replace('-content', '');
        $display.hide();


        // Close
        let closeButton = '#' + display_id + ' .display-close-button';
        let $closeButton = $(closeButton);

        // -- add EventListener
        $closeButton.click(function () {
            $display.hide();
        });


        // Toggle Close
        let toggleButton = '.' + display_name + '-toggle-button';
        let $toggleButton = $(toggleButton);

        // -- add EventListener
        $toggleButton.click(function () {
            $display.toggle();
        });


        // minimize
        let miniButton = '#' + display_id + ' .display-header';
        let $miniButton = $(miniButton);

        // content
        let main = '#' + display_id + ' .display-main';
        let $main = $(main);

        // -- add EventListener
        $miniButton.dblclick(function () {
            $main.slideToggle('fast');
        });


        // Draggable
        $display.draggable();


        if (display_Key) {
            // Keystroke
            key(display_Key, function () {
                $display.toggle();
            });
        }

    }

    toggle(name:string){

        // Toggle Close
        let display = '#' + name + '-display-content';
        let $display = $(display);

        // -- add EventListener
            $display.toggle();


    }


}