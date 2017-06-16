// Global
const _smartphoneSimName: string = 'smartphone-sim';
const _smartphoneSimContentName: string = 'smartphone-sim-content';

let _smartphoneSimOpen: boolean = true;
let _smartphoneSimUp: boolean = false;
let _smartphoneSimConsoleOpen: boolean = true;
let _smartphoneSimPing: number = 0;

/**
 *  SmartphoneSimController
 *
 */
class SmartphoneSimController {

    // DOM
    private elem_Root: any;
    private elem_Content: any;
    public simulator_size: string;


    /**
     * constructor
     */
    constructor(simulator_size?: string) {


        // Vars
        this.elem_Root = document.getElementById(_smartphoneSimName);
        this.elem_Content = document.getElementById(_smartphoneSimContentName);
        this.simulator_size = simulator_size;


        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#smartphone-sim-ready').ready(function () {
                console.log('- Smartphone Simulator load');

                // Aktionen verknüpfen
                SmartphoneSimController.setSize(this.simulator_size);
                SmartphoneSimController.makeDraggable();
                SmartphoneSimController.addAllEventsListeners();

                SmartphoneSimController.open();

                SmartphoneSimController.consoleOpen();
                SmartphoneSimController.consoleClear();

                // Tests

                //
                console.log('- Smartphone Simulator ready');

            }
        )


    }


    /**
     * addAllEventsListeners
     */
    static    addAllEventsListeners() {


        // Main-Menu : Show / Hide Simulator
        $('.smartphone-sim-button-toggle').click(SmartphoneSimController.toggle);

        // press home button
        $('#smartphone-home-button').click(SmartphoneSimController.homeButton);

        // Sim Console Clear
        $('.smartphone-console-clear').click(SmartphoneSimController.consoleClear);

        // Sim Console test
        $('.smartphone-console-test').click(SmartphoneSimController.consoleTest);

        // resize bigger
        $('#smartphone-toolbar-bigger').click(function () {
            SmartphoneSimController.setSize('groesser')
        });

        // resize smaler
        $('#smartphone-toolbar-smaler').click(function () {
            SmartphoneSimController.setSize('kleiner')
        });

        // close on dubbleclick
        $('#smartphone-frame').dblclick(SmartphoneSimController.close);


        // Keystrokes
        $(document).keypress(function (event: any) {

            let key: number = 115;  // Taste "S"

            if (event.which === key && !$(document.activeElement).is(_protectedInputs)) {
                event.preventDefault();
                SmartphoneSimController.toggle();
            }
        });



    }

    /**
     * makeDraggable
     */
    static  makeDraggable() {

        $('#smartphone-frame').draggable();
    }

    static setSize(faktor?: string) {

        // Devs
        let height: number;
        let width: number;
        let html: string;

        // die höhe und Breite vom smartphone holen
        let elem_height: string = $('#smartphone-frame').css('height');

        // vom rückgabewert "0000px" das "px"-suffix wegnehmen
        elem_height = elem_height.slice(0, -2);

        // in eine Zahl umwandeln
        let height_now: number = Number(elem_height);

        // Den übergabewert auswerten
        switch (faktor) {
            case 'klein':
                height = 400;
                break;

            case 'gross':
                height = 700;
                break;

            case 'kleiner':
                height = height_now - 100;
                break;

            case 'groesser':
                height = height_now + 100;
                break;

            default:
                height = 500;
        }

        // Das Smartphone ist halb so breit wie hoch
        width = height / 2;

        // Als CSS zuweisen
        $('#smartphone-frame').css('height', height).css('width', width);

    }

    static homeButton() {
        console.log('Homebutton gedrückt');

        // Sim Console ein/ausblenden
        SmartphoneSimController.consoleToggle();
    }


    static setContent(content: any) {

        let elem_Content = document.getElementById('smartphone-console');
        $(elem_Content).html(content);
    }


    // Console


    static message(text: string, tab?: number) {
        status = 'default';
        SmartphoneSimController.addToConsole(text, status, tab);
    }


    static ok(text: string, tab?: number) {
        status = 'ok';
        SmartphoneSimController.addToConsole(text, status, tab);
    }

    static warning(text: string, tab?: number) {
        status = 'warning';
        SmartphoneSimController.addToConsole(text, status, tab);
    }


    static error(text: string, tab?: number) {
        status = 'error';
        SmartphoneSimController.addToConsole(text, status, tab);
    }

    static consoleClear() {
        let html = '<div id="smartphone-console-prompt" class="prompt-pulse">_</div>';
        $('#smartphone-console-content').html(html);
        $('.smartphone-console-status').text('console');

    }

    static addToConsole(text: string, status?: any, tab?: number) {
        let elem_prompt = '#smartphone-console-prompt';
        let class_status: string;
        let class_tab: string;
        let message: string;

        // Die Class erstellen, die die Nachrichten formatiert
        // sass/utillities/_messages.scss
        class_status = 'message-' + status;


        // Spezielle Textauszeichnungen
        switch (text) {
            case '-':
                message = '<hr class="console">';
                break;
            default:
                message = text;
        }

        // Text einrücken
        if (tab) {
            class_tab = 'tab-' + tab;
        } else {
            class_tab = '';
        }


        // beim ersten Aufruf die Console mit dem Promt versehen
        if (!$(elem_prompt).length) {
            SmartphoneSimController.consoleClear();
        }
        // Zeile hinzufügen
        $(elem_prompt).before('<div class="' + class_status + ' ' + class_tab + '">' + message + '</div>');
    }


    static consoleOpen() {
        _smartphoneSimConsoleOpen = true;

        $('#smartphone-console').slideDown('fast', function () {
            $('#smartphone-console-content').css('visibility', 'visible');

        });
    }

    static consoleClose() {
        _smartphoneSimConsoleOpen = false;
        $('#smartphone-console-content').css('visibility', 'hidden');

        $('#smartphone-console').slideUp('fast');
    }

    static consoleToggle() {
        if (_smartphoneSimConsoleOpen) {
            SmartphoneSimController.consoleClose();
        }
        else {
            SmartphoneSimController.consoleOpen();
        }
    }


    static ping() {


        // ramen Bildschirm leuchten lassen

        $('#smartphone-screen').addClass('ping-pulse');
        setTimeout(function () {
            $('#smartphone-screen').removeClass('ping-pulse');

        },600);

        let ping: number = 1;

        if (_smartphoneSimPing != 0) {
            ping = _smartphoneSimPing + 1;
        }

        let badge = 'PING <span class="ping-badge">' + ping + '</span>';
        $('.smartphone-console-status').html(badge);

        _smartphoneSimPing = ping;

        return ping;
    }


// Simulator Window
    static open() {
        _smartphoneSimOpen = true;
        $('#' + _smartphoneSimContentName).show();

        // im Status-Display das Smartphone-pikto ausblenden:
        $('#status-display-smartphone').hide();
    }

    static close() {
        _smartphoneSimOpen = false;
        $('#' + _smartphoneSimContentName).hide();

        // im Status-Display das Smartphone-pikto einblenden:
        $('#status-display-smartphone').show();
    }

    static toggle() {
        if (_smartphoneSimOpen) {
            SmartphoneSimController.close();
        }
        else {
            SmartphoneSimController.open();
        }
    }

    static consoleTest() {
        SmartphoneSimController.open();
        $('.smartphone-console-status').text('test running...');

        let testmessages = [
            // ['status', 'text', 'tab'],
            ['default', 'Start Test'],
            ['default', '-'],
            ['default', 'da kommt was'],
            ['warning', 'sieht nicht gut aus'],
            ['default', 'oder doch?'],
            ['warning', 'nein, gar nicht gut'],
            ['error', 'Hilfe es kommt auf mich zu', 0],
            ['default', '3', 1],
            ['default', '2', 2],
            ['default', '1', 3],
            ['default', ''],
            ['warning', 'uff! knapp daneben'],
            ['ok', 'und wieder alles gut'],
            ['default', '-'],
            ['default', 'End Test <a onclick="SmartphoneSimController.consoleClear()">[clear]</a>'],
            ['default', '-']
        ];

        const speed = 500;
        let timer = setInterval(lineAfterLine, speed);
        let length = testmessages.length;
        let index = 0;

        function lineAfterLine() {
            let message = testmessages[index];

            let text: any = message[1];
            let status: any = message[0];
            let tab: any = 0;
            if (message[2]) {
                tab = message[2];
            }
            SmartphoneSimController.addToConsole(text, status, tab);

            index++;

            // remove timer after interating through all articles
            if (index >= length) {
                clearInterval(timer);
                $('.smartphone-console-status').text('test end');

            }
        }

    }
}



