/**
 * Einfache Funktionskontrolle
 * Sandbox für Experimente
 *
 * @param text
 */


$(function () {
    var socket = io();

    // Nachricht schicken
    $('#botton-socket-test-message').click(function () {
        console.log('button message');

        // Nachricht schicken
        socket.emit('chat message', $('#testtext').val());

        // Inputfeld leeren
        $('#testtext').val('');

        return false;
    });


    // ping_2 schicken
    $('#botton-socket-test-ping_2').click(function () {
        console.log('button ping_2');

        // Nachricht schicken
        socket.emit('ping_2', 'ping_2');

        return false;
    });


    // ping_2 schicken
    $('#botton-socket-test-steuerbefehl').click(function () {
        console.log('steuerbefehl');

        // Nachricht schicken
        socket.emit('steuerbefehl', 'vorwärts');

        return false;
    });



    // Nachricht empfangen

    socket.on('chat message', function (msg) {

        console.log(msg);
        SmartphoneSimController.message(msg);

    });



    // steuerbefehl empfangen

    socket.on('steuerbefehl', function (msg) {

        console.log(msg);
        SmartphoneSimController.message(msg);

    });

    // ping_2 empfangen

    socket.on('ping_2', function (msg) {

        console.log(msg);
        SmartphoneSimController.message(msg);

    });

});

