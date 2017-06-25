interface Display{
    show():void;
    hide():void;
    toggle():void;
}

class Display{

    private name:string;
    private $display:any;  // jQuery

    constructor(name:string){

        this.name = name;
        const display = '#' + this.name + '-display-content';
        this.$display = $(display);
    }

    hide(){
        this.$display.hide();
    }

    show(){
        this.$display.show();
    }

    toggle(){
        this.$display.toggle();
    }
}



class DisplayController {

    public displays:any;

    constructor() {

        this.displays = [];
        this.searchDisplays();

        return this.displays;

    }


    searchDisplays() {

        let $displays = $('.nicer-display');
        let displays:string[] = [];

        for (let i = 0; i < $displays.length; i++) {

            let display_ID = $($displays[i]).attr('id');
            let display_Key = $($displays[i]).data('keystroke');

            // den Namen kürzen und in die Variable stellen
            let display_name = display_ID.replace('-display-content', '');
            displays[i] = display_name;

            // EventListener aktivieren
            this.activate(display_ID, display_Key);

            // dynamische Objekte erstellen
            this.generate(display_name);
        }


        return displays;

    }

    generate(display_name:string){

        let display = new Display(display_name);

        this.displays.push(display_name);
        this.displays[display_name] = display;

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


        // flip
        let flipConteiner = '#' + display_id + ' .flip-container';
        let $flipConteiner = $(flipConteiner);

        if($flipConteiner){

            // content
            let flipButton = '#' + display_id + ' .flip-toggle-button';
            let $flipButton = $(flipButton);

            // -- add EventListener
            $flipButton.click(function () {
                $flipConteiner.toggleClass('flip');
            });


        }

    }





}