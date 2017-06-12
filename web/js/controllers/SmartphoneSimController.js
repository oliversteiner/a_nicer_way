/**
 *  SmartphoneSimController
 *
 */
// Global
var _smartphoneSimName = 'smartphone-sim';
var _smartphoneSimContentName = 'smartphone-sim-content';
var _smartphoneSimOpen = true;
var _smartphoneSimUp = false;
var _smartphoneSimConsoleOpen = true;
var SmartphoneSimController = (function () {
    /**
     * constructor
     */
    function SmartphoneSimController(simulator_size) {
        this.simulator_size = 1;
        // Vars
        this.className = 'SmartphoneSimController';
        this.elem_Root = document.getElementById(_smartphoneSimName);
        this.elem_Content = document.getElementById(_smartphoneSimContentName);
        this.simulator_size = simulator_size;
        // Views laden
        $(this.elem_Root).load('../views/smartphone_sim.html'); // aus dem View-Verzeichnis laden, und gleich ausblenden
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#smartphone-sim-ready').ready(function () {
            console.log('- Smartphone Simulator load');
            // Aktionen verknüpfen
            //   SmartphoneSimController.makeDraggable();
            SmartphoneSimController.addAllEventsListeners();
            SmartphoneSimController.open();
            SmartphoneSimController.moveUp();
            SmartphoneSimController.consoleOpen();
            SmartphoneSimController.message('bereit...');
            // Tests
            //  SmartphoneSimController.consoleTest();
            //
            console.log('- Smartphone Simulator ready');
        });
    }
    /**
     * addAllEventsListeners
     */
    SmartphoneSimController.addAllEventsListeners = function () {
        // Move Sim up / Down
        $('#smartphone-toolbar').click(SmartphoneSimController.moveToggle);
        // Main-Menu : Show / Hide Simulator
        $('.smartphone-sim-button-toggle').click(SmartphoneSimController.toggle);
        // press home button
        $('#smartphone-home-button').click(SmartphoneSimController.homeButton);
        // Sim Console consoleClear
        $('.smartphone-console-clear').click(SmartphoneSimController.consoleClear);
        $('.smartphone-console-test').click(SmartphoneSimController.consoleTest);
    };
    /**
     * makeDraggable
     */
    SmartphoneSimController.makeDraggable = function () {
        $('#' + _smartphoneSimContentName).draggable();
    };
    SmartphoneSimController.setSize = function () {
        console.log('setSize');
        // die höhe und Breite vom smartphone ausrechnen
        // das Phone an den
    };
    SmartphoneSimController.homeButton = function () {
        console.log('Homebutton gedrückt');
        // Sim Console ein/ausblenden
        SmartphoneSimController.consoleToggle();
    };
    SmartphoneSimController.moveDown = function () {
        _smartphoneSimUp = false;
        $('#' + _smartphoneSimContentName).addClass('smartphone-close');
        $('.smartphone-toolbar-move span').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
    };
    SmartphoneSimController.moveUp = function () {
        _smartphoneSimUp = true;
        $('#' + _smartphoneSimContentName).removeClass('smartphone-close');
        $('.smartphone-toolbar-move span').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
    };
    SmartphoneSimController.moveToggle = function () {
        if (_smartphoneSimUp) {
            SmartphoneSimController.moveDown();
        }
        else {
            SmartphoneSimController.moveUp();
        }
    };
    SmartphoneSimController.setContent = function (content) {
        var elem_Content = document.getElementById('smartphone-console');
        $(elem_Content).html(content);
    };
    // Console
    SmartphoneSimController.message = function (text, tab) {
        status = 'default';
        SmartphoneSimController.addToConsole(text, status, tab);
    };
    SmartphoneSimController.ok = function (text, tab) {
        status = 'ok';
        SmartphoneSimController.addToConsole(text, status, tab);
    };
    SmartphoneSimController.warning = function (text, tab) {
        status = 'warning';
        SmartphoneSimController.addToConsole(text, status, tab);
    };
    SmartphoneSimController.error = function (text, tab) {
        status = 'error';
        SmartphoneSimController.addToConsole(text, status, tab);
    };
    SmartphoneSimController.consoleClear = function () {
        var html = '<div id="smartphone-console-prompt" class="prompt-pulse">_</div>';
        $('#smartphone-console-content').html(html);
        $('.smartphone-console-status').text('console');
    };
    SmartphoneSimController.addToConsole = function (text, status, tab) {
        var elem_prompt = '#smartphone-console-prompt';
        var class_status;
        var class_tab;
        var message;
        // Die Class erstellen, die die nachrichten formatiert
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
            SmartphoneSimController.consoleClear();
        }
        // Zeile hinzufügen
        $(elem_prompt).before('<div class="' + class_status + ' ' + class_tab + '">' + message + '</div>');
    };
    SmartphoneSimController.consoleOpen = function () {
        _smartphoneSimConsoleOpen = true;
        $('#smartphone-console').slideDown('fast', function () {
            $('#smartphone-console-content').css('visibility', 'visible');
        });
    };
    SmartphoneSimController.consoleClose = function () {
        _smartphoneSimConsoleOpen = false;
        $('#smartphone-console-content').css('visibility', 'hidden');
        $('#smartphone-console').slideUp('fast');
    };
    SmartphoneSimController.consoleToggle = function () {
        if (_smartphoneSimConsoleOpen) {
            SmartphoneSimController.consoleClose();
        }
        else {
            SmartphoneSimController.consoleOpen();
        }
    };
    // Simulator Window
    SmartphoneSimController.open = function () {
        _smartphoneSimOpen = true;
        $('#' + _smartphoneSimContentName).show();
    };
    SmartphoneSimController.close = function () {
        _smartphoneSimOpen = false;
        $('#' + _smartphoneSimContentName).hide();
    };
    SmartphoneSimController.toggle = function () {
        if (_smartphoneSimOpen) {
            SmartphoneSimController.close();
        }
        else {
            SmartphoneSimController.open();
        }
    };
    SmartphoneSimController.consoleTest = function () {
        SmartphoneSimController.moveUp();
        $('.smartphone-console-status').text('test running...');
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
            ['default', 'End Test <a onclick="SmartphoneSimController.consoleClear()">[clear]</a>'],
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
            SmartphoneSimController.addToConsole(text, status, tab);
            index++;
            // remove timer after interating through all articles
            if (index >= length) {
                clearInterval(timer);
                $('.smartphone-console-status').text('test end');
            }
        }
    };
    return SmartphoneSimController;
}());
