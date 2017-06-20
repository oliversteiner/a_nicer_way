/// <reference path="definitions/io.d.ts" />


$(function () {

    // Init
    let socket = io();
    socketAddListeners();
    receiveTimepoint();
    receiveTimepointId();
    receiveTimepointList();
    getList();



    // SEND
    function socketSend(type: any, msg: any) {

        // Nachricht schicken
        socket.emit(type, msg);
    }

    function sendMessge() {
        console.log('button message');

        let $button_socket_message = $('#input-socket-message');
        let msg = $button_socket_message.val();

        // Nachricht schicken
        socketSend('chat message', msg);

        // Inputfeld leeren
        $button_socket_message.val('');
    }

    function sendPing() {
        // ping_2 schicken
        console.log('button ping');

        let png = 'PING';

        // Nachricht schicken
        socketSend('ping_2', png);

        // Inputfeld leeren
    }

    function sendCommand() {
        // ping_2 schicken
        let data = $(this).data();
        let cmd = data.command;
        console.log(cmd);

        // Nachricht schicken
        socketSend('command', cmd);
    }

    function sendTimepoint(doc: any) {
        console.log(doc);

        // Nachricht schicken
        socketSend('timepoint', doc);
    }


    function goTo() {
        // ping_2 schicken
        let data = $(this).data();
        let  id = data.id;
        console.log(id);

        // Nachricht schicken
        socketSend('timepoint id', id);
        markAsActive(id);

    }





    function receiveTimepoint() {

        // Nachricht empfangen
        socket.on('timepoint', function (doc: any) {

            setTimepoint(doc);
            markAsActive(doc._id);

        })

    }


    function receiveTimepointId() {

        // Nachricht empfangen
        socket.on('timepoint id', function (id: any) {

            markAsActive(id);

        })

    }

    function receiveTimepointList() {

        // Nachricht empfangen
        socket.on('timepoint list', function (list: any) {
            generateNavigationList(list);
            $('.socket-waypoint-button').click(goTo);

        })

    }


    // Listeners
    function socketAddListeners() {
        $('.socket-message-button').click(sendMessge);
        $('.socket-ping-button').click(sendPing);
        $('.socket-cmd-button').click(sendCommand);
        $('.socket-waypoint-button').click(goTo);

    }

    // setTimepoint
    function setTimepoint(doc: any) {
        console.log(doc);

        let html = '<div class="sequence">' + doc.sequence + '</div>' +
            '<div class="title">' + doc._id + '</div>';

        $('#remote-slide-preview').html(html);
    }

    /**
     *
     */
    function getList(){
        socket.emit('command', 'get-list');
    }


    /**
     *
     *
     * @param list
     */
    function generateNavigationList(list?: any) {

        // STATIC
        let elemNav = document.getElementById('remote-list-main');


        // reset nav
        elemNav.innerHTML = '';

        // ul
        let ul = document.createElement('ul');

        // nav > ul
        elemNav.appendChild(ul);

        // ul > li*

        if (list) {


            for (let i = 1, len = list.length; i < len + 1; i++) {
                let doc = list[i];

                if (doc) {
                    // li
                    let li = document.createElement('li');
                    ul.appendChild(li);

                    // a
                    let a = document.createElement('a');

                    // a.class
                    a.setAttribute('class', 'socket-waypoint-button btn btn-nicer btn-block');

                    // a.data-id
                    a.setAttribute('data-id', doc._id);


                    // Text
                    let title = doc.sequence + ' - ' + doc.date + ' - ' + doc.place;
                    let text = document.createTextNode(title);

                    // li > a > text
                    li.appendChild(a);
                    a.appendChild(text);
                }
            }

        } else {
            console.log('generateNavigationList -- Leere Liste');
        }


    }

    /**
     *
     * @param id
     */
    function markAsActive(id: string) {

        $('a.active').removeClass('active');

        let find = '*[data-id="'+ id +'"]';
        $(find).addClass('active');
        console.log($(find));
    }


});