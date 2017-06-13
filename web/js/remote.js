/// <reference path="definitions/io.d.ts" />
$(function () {
    var socket = io();
    socketAddListeners();
    receivePing();
    receiveCommand();
    receiveMessage();
    function socketSend(type, msg) {
        // Nachricht schicken
        socket.emit(type, msg);
    }
    function sendMessge() {
        console.log('button message');
        var $testtext = $('#testtext');
        var msg = $testtext.val();
        // Nachricht schicken
        socketSend('chat message', msg);
        // Inputfeld leeren
        $testtext.val('');
    }
    function sendPing() {
        // ping_2 schicken
        console.log('button ping');
        var msg = 'PING';
        // Nachricht schicken
        socketSend('ping_2', msg);
        // Inputfeld leeren
    }
    function sendCommand() {
        // ping_2 schicken
        console.log('button Command');
        // Nachricht schicken
        socketSend('command', 'vorwärts');
    }
    function receiveMessage() {
        // Nachricht empfangen
        socket.on('chat message', function (msg) {
            console.log(msg);
            SmartphoneSimController.message(msg);
        });
    }
    function receiveCommand() {
        // steuerbefehl empfangen
        socket.on('command', function (cmd) {
            console.log(cmd);
            switch (cmd) {
                default:
                    SmartphoneSimController.error('Remotebefehl nicht verstanden');
                    SmartphoneSimController.error('> ' + cmd, 1);
            }
        });
    }
    function receivePing() {
        // ping_2 empfangen
        socket.on('ping_2', function () {
            console.log('PING');
            SmartphoneSimController.ping();
        });
    }
    function socketAddListeners() {
        $('#botton-socket-test-message').click(sendMessge);
        $('#botton-socket-test-ping_2').click(sendPing);
        $('#botton-socket-test-steuerbefehl').click(sendCommand);
        // Keystrokes
        $('#testtext').keypress(function (event) {
            console.log(event.which);
            var key = 13; // Taste "h"
            if (event.which === key) {
                event.preventDefault();
                // Das Hilfsfenster ein / ausblenden
                sendMessge();
            }
        });
    }
});
