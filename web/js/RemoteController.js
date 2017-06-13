/// <reference path="socket.io.d.ts" />
var remoteController;
var RemoteController = (function () {
    function RemoteController() {
        this.socket = new SocketIO;
        var msg = 'Verbindung hergestellt';
        this.socket.emit('chat message', msg);
        this.addEventListeners();
        // Empfang einschalten
        //  this.receivePing();
        //  this.receiveMessage();
        //  this.receiveCommand();
    }
    RemoteController.prototype.send = function (type, msg) {
        // Nachricht schicken
        this.socket.emit(type, msg);
        return false;
    };
    RemoteController.prototype.addEventListeners = function () {
        $('#botton-socket-test-message').click(this.sendMessge);
        $('#botton-socket-test-ping_2').click(this.sendPing);
        $('#botton-socket-test-steuerbefehl').click(this.sendCommand);
    };
    RemoteController.prototype.sendMessge = function () {
        console.log('button message');
        var $testtext = $('#testtext');
        var msg = $testtext.val();
        // Nachricht schicken
        this.send('chat message', msg);
        // Inputfeld leeren
        $testtext.val('');
        return false;
    };
    RemoteController.prototype.sendPing = function () {
        // ping_2 schicken
        console.log('button ping');
        var msg = 'PING';
        // Nachricht schicken
        this.send('ping_2', msg);
        // Inputfeld leeren
        return false;
    };
    RemoteController.prototype.sendCommand = function () {
        // ping_2 schicken
        console.log('button Command');
        // Nachricht schicken
        this.send('command', 'vorwärts');
        return false;
    };
    RemoteController.prototype.receive = function () {
    };
    RemoteController.prototype.receiveMessage = function () {
        // Nachricht empfangen
        this.socket.on('chat message', function (msg) {
            console.log(msg);
            SmartphoneSimController.message(msg);
        });
    };
    RemoteController.prototype.receiveCommand = function () {
        // steuerbefehl empfangen
        this.socket.on('command', function (cmd) {
            console.log(cmd);
            switch (cmd) {
                default:
                    SmartphoneSimController.error('Remotebefehl nicht verstanden');
                    SmartphoneSimController.error('>' + cmd, 1);
            }
        });
    };
    RemoteController.prototype.receivePing = function () {
        // ping_2 empfangen
        this.socket.on('ping_2', function (png) {
            console.log(png);
            SmartphoneSimController.message(png);
        });
    };
    return RemoteController;
}());
$(document).ready(function () {
    remoteController = new RemoteController;
});
