// Global
const _smartphoneSimName: string = 'smartphone-sim';
const _smartphoneSimContentName: string = 'smartphone-sim-content';

let _smartphoneSimOpen: boolean = true;
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

    public last_position: any = false;

    /**
     * constructor
     */
    constructor(simulator_size?: string) {

        // Vars
        this.elem_Root = document.getElementById(_smartphoneSimName);
        this.elem_Content = document.getElementById(_smartphoneSimContentName);
        this.simulator_size = simulator_size;

        console.log('- Smartphone Simulator load');

        // Aktionen verknüpfen
        SmartphoneSimController.setSize(this.simulator_size);
        this.addEventListeners();
        this.addKeystrokes();
        this.makeDraggable();

        SmartphoneSimController.open();
        SmartphoneSimController.consoleOpen();
        SmartphoneSimController.consoleClear();
        SmartphoneSimController.consoleClose();

        // Tests

        //
        console.log('- Smartphone Simulator ready');

    }


    /**
     * addEventsListeners
     */
    addEventListeners() {

        // Main-Menu : Show / Hide Simulator
        $('.smartphone-sim-button-toggle').click(SmartphoneSimController.toggle);

        // press home button
        $('#smartphone-home-button').click(SmartphoneSimController.homeButton);

        // Sim Console Clear
        $('.smartphone-console-clear').click(SmartphoneSimController.consoleClear);

        // Sim Console test
        $('.smartphone-console-test').click(SmartphoneSimController.consoleTest);


        // close
        $('#smartphone-toolbar-close').click(function () {
            SmartphoneSimController.close()
        });

        // resize bigger
        $('#smartphone-toolbar-bigger').click(function () {
            SmartphoneSimController.setSize('groesser')
        });

        // resize smaler
        $('#smartphone-toolbar-smaler').click(function () {
            SmartphoneSimController.setSize('kleiner')
        });

        // Solo-Modus
        $('#smartphone-toolbar-solo').click(function () {
            aNicerWay.smartphoneSimController.toggleSolo()
        });

    }

    /**
     * addKeystrokes
     */

    addKeystrokes() {
        key('s', function () {
            SmartphoneSimController.toggle();
        });
    }

    /**
     * makeDraggable
     */

    makeDraggable() {

        $('#smartphone-frame').draggable();
    }

    /**
     *
     * Solo-Modus
     */

    toggleSolo() {

        const $blackout: any = $('#blackout');


        if (this.last_position) {
            // Solo-Modus beenden


            // Hintergrund abdunkeln beenden
            $blackout.removeClass('blackout-active');

            // Smartphone zurückplazieren
            $('#smartphone-sim-content').removeClass('solo-active');

            let $device = $('#smartphone-frame');
            $device.css('height', this.last_position.heigh);
            $device.css('width', this.last_position.width);
            $device.css('left', this.last_position.left);
            $device.css('top', this.last_position.top);
            $('#smartphone-content').css('transform', this.last_position.transform);

            this.last_position = false;

        }
        else {
            // Solo-Modus Starten


            // Grösse und Position vom Smartphone holen
            let $device = $('#smartphone-frame');

            let height: string = $device.css('height');
            let width: string = $device.css('width');
            let left: string = $device.css('left');
            let top: string = $device.css('top');
            let transform: string = $('#smartphone-content').css('transform');

            // Werte speichern
            this.last_position = {
                heigh: height,
                width: width,
                left: left,
                top: top,
                transform: transform
            };

            // Hintergrund abdunkeln
            $blackout.addClass('blackout-active');

            // Smartphone zentrieren
            $('#smartphone-sim-content').addClass('solo-active');

            // Smartphone in die maximale höhe bringen:
            const smartphone: any = SmartphoneSimController.setSize();
            const viewwidth: number = document.body.clientWidth;

            // Mitte ausrechnen:
            // pixel von links:  ( viewport breite / 2 ) -  (smartphone-breite / 2 )
            const left_2 = viewwidth / 2 - smartphone.width / 2;

            $('#smartphone-frame')
                .css('top', '40px')  // von open 20px
                .css('left', left_2);

            // mit ESC Solo-Modus beenden
            key('esc', function () {
                aNicerWay.smartphoneSimController.toggleSolo();
            });

            // neben Smartphone clicken zum schliessen
            $blackout.click(function () {
                aNicerWay.smartphoneSimController.toggleSolo();
            });

        }

    }


    static
    setSize(faktor ?: string) {

        // Devs
        let height: number;
        let width: number;

        // die höhe und Breite vom smartphone holen
        let elem_height: string = $('#smartphone-frame').css('height');

        // vom rückgabewert "0000px" das "px"-suffix wegnehmen
        elem_height = elem_height.slice(0, -2);

        // in eine Zahl umwandeln
        let height_now: number = Number(elem_height);
        let hype: number = 0;    // der Skalierungsfaktor fürs hype
        // Der hype inhalt ist 375px breit

        let height_original: number = 840;
        let prozent: any = 0;


        // Den übergabewert auswerten
        switch (faktor) {
            case 'voll':
                height = 840;
                hype = 1;
                break;

            case 'gross':
                height = 700;
                hype = 0.83;
                break;

            case 'mittel':
                height = 550;
                hype = 0.65;
                break;

            case 'halb':
                height = 420;
                hype = 0.5;
                break;

            case 'kleiner':
                height = height_now - 100;


                break;

            case 'groesser':
                height = height_now + 100;

                break;

            default:
                // maximale höhe:
                const document_height = document.body.clientHeight;
                height = document_height - 40;

        }

        // Das Smartphone ist halb so breit wie hoch
        width = height / 2;

        //
        if (hype == 0) {
            // prozent_runden(100 * (b - a) / b);
            prozent = prozent_runden(100 * (height_original - height) / height_original);
            hype = (100 - prozent) * 0.01;
        }

        // Als CSS zuweisen
        $('#smartphone-frame').css('height', height).css('width', width);
        $('#smartphone-content').css('transform', 'scale(' + hype + ')');

        let size = {
            height: height,
            width: width,
            screenfactor: hype
        };

        return size;
    }

    static
    homeButton() {
        // console.log('Homebutton gedrückt');

        // Sim Console ein/ausblenden
        SmartphoneSimController.consoleToggle();
    }


    static
    setContent(content: any) {

        let elem_Content = document.getElementById('smartphone-console');
        $(elem_Content).html(content);
    }


// Console

    static
    message(text: string, tab ?: number) {
        status = 'default';
        SmartphoneSimController.addToConsole(text, status, tab);
    }

    static
    ok(text: string, tab ?: number) {
        status = 'ok';
        SmartphoneSimController.addToConsole(text, status, tab);
    }

    static
    warning(text: string, tab ?: number) {
        status = 'warning';
        SmartphoneSimController.addToConsole(text, status, tab);
    }

    static
    error(text: string, tab ?: number) {
        status = 'error';
        SmartphoneSimController.addToConsole(text, status, tab);
    }

    static
    consoleClear() {
        let html = '<div id="smartphone-console-prompt" class="smartphone-console-prompt  prompt-pulse">_</div>';
        $('#smartphone-console-main').html(html);
        $('.smartphone-console-status').text('console');

    }

    static addToConsole(text: string, status ?: any, tab ?: number) {
        // console.log('add To Console');
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

    static
    consoleOpen() {
        _smartphoneSimConsoleOpen = true;

        $('#smartphone-console').slideDown('fast', function () {
            $('#smartphone-console-content').css('visibility', 'visible');

        });
    }

    static
    consoleClose() {
        _smartphoneSimConsoleOpen = false;
        $('#smartphone-console-content').css('visibility', 'hidden');

        $('#smartphone-console').slideUp('fast');
    }

    static
    consoleToggle() {
        if (_smartphoneSimConsoleOpen) {
            SmartphoneSimController.consoleClose();
        }
        else {
            SmartphoneSimController.consoleOpen();
        }
    }

    static
    ping() {


        // ramen Bildschirm leuchten lassen

        $('#smartphone-screen').addClass('ping-pulse');
        setTimeout(function () {
            $('#smartphone-screen').removeClass('ping-pulse');

        }, 600);

        let ping: number = 1;

        if (_smartphoneSimPing != 0) {
            ping = _smartphoneSimPing + 1;
        }

        let badge = 'PING <span class="ping-badge">' + ping + '</span>';
        $('.smartphone-console-status').html(badge);

        _smartphoneSimPing = ping;

        return ping;
    }

    static
    consoleTest() {
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


// Simulator Window
    static
    open() {
        _smartphoneSimOpen = true;
        $('#' + _smartphoneSimContentName).show();

        // im Status-Display das Smartphone-pikto ausblenden:
        $('#status-display-smartphone').hide();
    }

    static
    close() {
        _smartphoneSimOpen = false;
        $('#' + _smartphoneSimContentName).hide();

        // im Status-Display das Smartphone-pikto einblenden:
        $('#status-display-smartphone').show();
    }

    static
    toggle() {
        if (_smartphoneSimOpen) {
            SmartphoneSimController.close();
        }
        else {
            SmartphoneSimController.open();
        }
    }

}



