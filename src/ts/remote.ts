/// <reference path="definitions/io.d.ts" />
let _list_open = false;
let _list: any = false;


$(function () {

    // Init
    let socket = io();
    socketAddListeners();
    receiveTimePointNr();
    receiveTimepointList();
    getList();

    // SEND
    function socketSend(type: any, msg: any) {

        // Nachricht schicken
        socket.emit(type, msg);
    }


    function sendMessge() {
        let $button_socket_message = $('#input-socket-message');
        let msg = $button_socket_message.val();

        // Nachricht schicken
        socketSend('chat message', msg);

        // Inputfeld leeren
        $button_socket_message.val('');
    }


    function sendPing() {
        let png = 'PING';

        // ping an ANW schicken
        socketSend('ping_2', png);

    }


    function sendCommand() {
        let data = $(this).data();
        let cmd = data.command;

        // command an ANW schicken
        socketSend('command', cmd);
    }


    function goTo() {
        let data = $(this).data();
        let id = data.id;

        // Timepoint an ANW schicken
        socketSend('timepoint id', id);

    }


    // receive

    function receiveTimePointNr() {
        // Nachricht empfangen
        socket.on('timepoint nr', function (nr: any) {

            setTimepoint(nr);

        })

    }

    function receiveTimepointList() {

        // Nachricht empfangen
        socket.on('timepoint list', function (list: any) {

            // save in Global
            _list = list;

            // Navigation aufbauen
            generateNavigationList(_list);

        })

    }


    /**
     *
     *
     */
    function socketAddListeners() {
        $('.socket-message-button').click(sendMessge);
        $('.socket-ping-button').click(sendPing);
        $('.socket-cmd-button').click(sendCommand);
        $('.socket-waypoint-button').click(goTo);
        $('.remote-open-list-button').click(toggleList);
        $('.txt-open-button').click(openTxt);
        $('.txt-close-button').click(closeTxt);

    }

    /**
     *
     *
     * @param sequence_nr
     */
    function setTimepoint(sequence_nr: any) {

        // load doc
        let doc = _list[sequence_nr];

        // generate html for preview
        let html = '<div class="sequence">' + sequence_nr + '</div>' +
            '<div class="title">' + doc._id + '</div>';

        // Add to Preview
        $('#remote-slide-preview').html(html);

        // Mark in List
        markAsActive(doc._id);

        // Button previous
        $('.slide-number-previous').text(sequence_nr - 1);

        // Button next
        $('.slide-number-next').text(sequence_nr + 1);

    }

    /**
     *
     */
    function getList() {

        if (_list) {
            // Update List ?
        }
        else {
            // nur Anfragen, wenn globale Liste leer ist
            socket.emit('command', 'get-list');

        }

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


        // addEventListeners
        $('.socket-waypoint-button').click(goTo);

    }

    /**
     *
     * @param id
     */
    function markAsActive(id: string) {

        $('a.active').removeClass('active');

        let find = '*[data-id="' + id + '"]';
        $(find).addClass('active');
    }


    function openList(clientHeight:number) {
        console.log('open');
        _list_open = true;



        $('#remote-list-wrapper').removeClass('slide-up');
        $('#remote-list-wrapper').addClass('slide-down');
        $('#remote-list-wrapper').css('height', clientHeight+'px');


        // Button zu close
        $('.remote-open-list-button span')
            .removeClass('glyphicon-menu-down')
            .addClass('glyphicon-menu-up');
    }


    function closeList() {
        console.log('close');

        _list_open = false;


        $('#remote-list-wrapper').removeClass('slide-down');
        $('#remote-list-wrapper').addClass('slide-up');
        $('#remote-list-wrapper').css('height', 0);

        // Button zu open
        $('.remote-open-list-button span')
            .removeClass('glyphicon-menu-up')
            .addClass('glyphicon-menu-down');
    }


    function toggleList() {

        console.log('_list_open : ' + _list_open);

        getList();


        let clientHeight = document.getElementById('remote-list-main').clientHeight;

        console.log(clientHeight);



            if (_list_open) {
                closeList();
            }
            else {
                openList(clientHeight);
            }



    }


    function openTxt() {
        $('#mobile-toolbar.flip-container').addClass('flip');
        $('#input-socket-message').focus();
    }

    function closeTxt() {
        $('#mobile-toolbar.flip-container').removeClass('flip');
        $('#input-socket-message').focusout();

    }

});