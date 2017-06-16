/// <reference path="definitions/io.d.ts" />
$(function () {
    // Init
    var socket = io();
    socketAddListeners();
    receivePing();
    receiveCommand();
    receiveMessage();
    // SEND
    function socketSend(type, msg) {
        // Nachricht schicken
        socket.emit(type, msg);
    }
    function sendMessge() {
        console.log('button message');
        var $button_socket_message = $('#input-socket-message');
        var msg = $button_socket_message.val();
        // Nachricht schicken
        socketSend('chat message', msg);
        // Inputfeld leeren
        $button_socket_message.val('');
    }
    function sendPing() {
        // ping_2 schicken
        console.log('button ping');
        var png = 'PING';
        // Nachricht schicken
        socketSend('ping_2', png);
        // Inputfeld leeren
    }
    function sendCommand() {
        // ping_2 schicken
        var data = $(this).data();
        var cmd = data.command;
        console.log(cmd);
        // Nachricht schicken
        socketSend('command', cmd);
    }
    // RECEIVE
    function receiveCommand() {
        // steuerbefehl empfangen
        socket.on('command', function (cmd) {
            console.log(cmd);
            switch (cmd) {
                case 'previous':
                    NavigationController.scrollToPreviews();
                    break;
                case 'next':
                    NavigationController.scrollToNext();
                    break;
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
    function receiveMessage() {
        // Nachricht empfangen
        socket.on('chat message', function (msg) {
            console.log(msg);
            SmartphoneSimController.message(msg);
        });
    }
    // Listeners
    function socketAddListeners() {
        $('.button-socket-message').click(sendMessge);
        $('.button-socket-ping').click(sendPing);
        $('.button-socket-steuerbefehl').click(sendCommand);
        $('.button-socket-command').click(sendCommand);
    }
});
