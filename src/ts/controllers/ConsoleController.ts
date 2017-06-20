/**
 *  consoleController
 *
 */

// Global
const _consoleName: string = 'console-container';
const _consoleContentName: string = 'console-content';
let _consoleModalOpen: boolean = false;

// Class
class ConsoleController {

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.elem_Root = document.getElementById(_consoleName);
        this.elem_Content = document.getElementById(_consoleContentName);

        // Views laden


        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        console.log('- Console load');

        // Aktionen verknüpfen
        this.addKeystrokes();
        ConsoleController.modalClose();
        this.addEventListener();
        ConsoleController.consoleClear();

        //
        console.log('- Console ready');


    }

    /**
     *
     *
     */
    addEventListener(){

        $('.console-toggle-button').click(ConsoleController.modalToggle);
        $('.console-test').click(ConsoleController.consoleTest);
        $('.console-clear').click(ConsoleController.consoleClear);

    }

    /**
     * addKeystrokes
     */
     addKeystrokes() {
        key('c', function () {
            ConsoleController.modalToggle();
        });
    }


    /**
     * Fenster
     *
     */
    static modalClose() {
        _consoleModalOpen = false;
        $('#' + _consoleContentName).hide();

    }

    static modalOpen() {
        _consoleModalOpen = true;
        $('#' + _consoleContentName).show();
    }

    static modalToggle() {
        if (_consoleModalOpen) {
            ConsoleController.modalClose();
        }
        else {
            ConsoleController.modalOpen();
        }
    }


    /**
     * Console
     *
     */

    static message(text: string, tab?: number) {
        status = 'default';
        ConsoleController.addToConsole(text, status, tab);
    }

    static ok(text: string, tab?: number) {
        status = 'ok';
        ConsoleController.addToConsole(text, status, tab);
    }

    static warning(text: string, tab?: number) {
        status = 'warning';
        ConsoleController.addToConsole(text, status, tab);
    }


    static error(text: string, tab?: number) {
        status = 'error';
        ConsoleController.addToConsole(text, status, tab);
    }

    static consoleClear() {
        let html = '<div id="console-prompt" class="console-prompt prompt-pulse">_</div>';
        $('#console-main').html(html);
        $('#console-toolbar-status').text('console');

    }

    static addToConsole(text: string, status?: any, tab?: number) {
        let elem_prompt = '#console-prompt';
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
            ConsoleController.consoleClear();
        }
        // Zeile hinzufügen
        $(elem_prompt).before('<div class="' + class_status + ' ' + class_tab + '">' + message + '</div>');
    }

    static consoleTest() {
        ConsoleController.modalOpen();
        $('.console-status').text('test running...');

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
            ['default', 'End Test <a onclick="ConsoleController.consoleClear()">[clear]</a>'],
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
            ConsoleController.addToConsole(text, status, tab);

            index++;

            // remove timer after interating through all articles
            if (index >= length) {
                clearInterval(timer);
                $('.console-status').text('test end');

            }
        }

    }


}