/**
 *  consoleController
 *
 */
// Global
var _consoleName = 'console-container';
var _consoleContentName = 'console-content';
var _consoleModalOpen = false;
// Class
var ConsoleController = (function () {
    /**
     * constructor
     */
    function ConsoleController() {
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
    ConsoleController.prototype.addEventListener = function () {
        $('.console-toggle-button').click(ConsoleController.modalToggle);
        $('.console-test').click(ConsoleController.consoleTest);
        $('.console-clear').click(ConsoleController.consoleClear);
    };
    /**
     * addKeystrokes
     */
    ConsoleController.prototype.addKeystrokes = function () {
        key('c', function () {
            ConsoleController.modalToggle();
        });
    };
    /**
     * Fenster
     *
     */
    ConsoleController.modalClose = function () {
        _consoleModalOpen = false;
        $('#' + _consoleContentName).hide();
    };
    ConsoleController.modalOpen = function () {
        _consoleModalOpen = true;
        $('#' + _consoleContentName).show();
    };
    ConsoleController.modalToggle = function () {
        if (_consoleModalOpen) {
            ConsoleController.modalClose();
        }
        else {
            ConsoleController.modalOpen();
        }
    };
    /**
     * Console
     *
     */
    ConsoleController.message = function (text, tab) {
        status = 'default';
        ConsoleController.addToConsole(text, status, tab);
    };
    ConsoleController.ok = function (text, tab) {
        status = 'ok';
        ConsoleController.addToConsole(text, status, tab);
    };
    ConsoleController.warning = function (text, tab) {
        status = 'warning';
        ConsoleController.addToConsole(text, status, tab);
    };
    ConsoleController.error = function (text, tab) {
        status = 'error';
        ConsoleController.addToConsole(text, status, tab);
    };
    ConsoleController.consoleClear = function () {
        var html = '<div id="console-prompt" class="console-prompt prompt-pulse">_</div>';
        $('#console-main').html(html);
        $('#console-toolbar-status').text('console');
    };
    ConsoleController.addToConsole = function (text, status, tab) {
        var elem_prompt = '#console-prompt';
        var class_status;
        var class_tab;
        var message;
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
        }
        else {
            class_tab = '';
        }
        // beim ersten Aufruf die Console mit dem Promt versehen
        if (!$(elem_prompt).length) {
            ConsoleController.consoleClear();
        }
        // Zeile hinzufügen
        $(elem_prompt).before('<div class="' + class_status + ' ' + class_tab + '">' + message + '</div>');
    };
    ConsoleController.consoleTest = function () {
        ConsoleController.modalOpen();
        $('.console-status').text('test running...');
        var testmessages = [
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
        var speed = 500;
        var timer = setInterval(lineAfterLine, speed);
        var length = testmessages.length;
        var index = 0;
        function lineAfterLine() {
            var message = testmessages[index];
            var text = message[1];
            var status = message[0];
            var tab = 0;
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
    };
    return ConsoleController;
}());
