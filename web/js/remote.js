/// <reference path="definitions/io.d.ts" />
var _list_open = false;
var _list = false;
$(function () {
    // Init
    var socket = io();
    generateButtons();
    socketAddListeners();
    receiveTimePointNr();
    receiveTimepointList();
    getList();
    // SEND
    function socketSend(type, msg) {
        // Nachricht schicken
        socket.emit(type, msg);
    }
    function sendMessge() {
        var $button_socket_message = $('#input-socket-message');
        var msg = $button_socket_message.val();
        // Nachricht schicken
        socketSend('chat message', msg);
        // Inputfeld leeren
        $button_socket_message.val('');
    }
    function sendPing() {
        var png = 'PING';
        // ping an ANW schicken
        socketSend('ping_2', png);
    }
    function sendCommand() {
        var data = $(this).data();
        var cmd = data.command;
        // command an ANW schicken
        socketSend('command', cmd);
    }
    function goTo() {
        var data = $(this).data();
        var id = data.id;
        // Timepoint an ANW schicken
        socketSend('timepoint id', id);
    }
    // receive
    function receiveTimePointNr() {
        // Nachricht empfangen
        socket.on('timepoint nr', function (nr) {
            setTimepoint(nr);
        });
    }
    function receiveTimepointList() {
        // Nachricht empfangen
        socket.on('timepoint list', function (list) {
            // Navigation aufbauen
            generateNavigationList(list);
        });
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
        $('.remote-character-toggle-button').click(characterToggleFlip);
    }
    /**
     *
     *
     * @param sequence_nr
     */
    function setTimepoint(sequence_nr) {
        // load doc
        var doc = _list[sequence_nr];
        // generate html for preview
        var html = '<div class="sequence">' + sequence_nr + '</div>' +
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
    function generateNavigationList(list) {
        // save in Global
        _list = list;
        // STATIC
        var elemNav = document.getElementById('remote-list-main');
        // reset nav
        elemNav.innerHTML = '';
        // ul
        var ul = document.createElement('ul');
        // nav > ul
        elemNav.appendChild(ul);
        // ul > li*
        if (list) {
            for (var i = 1, len = list.length; i < len + 1; i++) {
                var doc = list[i];
                if (doc) {
                    // li
                    var li = document.createElement('li');
                    ul.appendChild(li);
                    // a
                    var a = document.createElement('a');
                    // a.class
                    a.setAttribute('class', 'socket-waypoint-button btn btn-nicer btn-block');
                    // a.data-id
                    a.setAttribute('data-id', doc._id);
                    // Text
                    var title = doc.sequence + ' - ' + doc.date + ' - ' + doc.place;
                    var text = document.createTextNode(title);
                    // li > a > text
                    li.appendChild(a);
                    a.appendChild(text);
                }
            }
        }
        else {
            console.log('generateNavigationList -- Leere Liste');
        }
        // addEventListeners
        $('.socket-waypoint-button').click(goTo);
    }
    /**
     *
     *
     *
     */
    function generateButtons() {
        var list = [
            {
                name: 'Schüler',
                id: 'proto-1',
                image: 'proto-1.png',
                image_walking: '',
                color: 'yellow',
                animate: {
                    walk: '',
                    wink: '',
                    talk: '',
                    wait: ''
                }
            },
            {
                name: 'Gruppe',
                id: 'proto-2',
                image: 'proto-2.png',
                color: 'red',
            },
            {
                name: 'Bus',
                id: 'proto-3',
                image: 'proto-3.png',
                color: 'purble',
            }
        ];
        //
        var elemNav = document.getElementById('remote-character-navigation');
        // reset nav
        elemNav.innerHTML = '';
        // Button Group
        var div_btn_group = document.createElement('div');
        div_btn_group.setAttribute('class', 'btn-group btn-group-inline');
        // div > div.btn-group
        elemNav.appendChild(div_btn_group);
        // ausblen
        var button_0 = '<button class="socket-cmd-button btn btn-default btn-sm" data-command="character-0"><span class="glyphicon glyphicon-ban-circle"></span></button>';
        div_btn_group.innerHTML = button_0;
        if (list != null) {
            for (var i = 0, len = list.length; i < len; i++) {
                var character = list[i];
                var character_nr = i + 1;
                if (character) {
                    var button = document.createElement('button');
                    var text = document.createTextNode(character.name);
                    button.setAttribute('class', 'socket-cmd-button btn btn-default btn-sm ');
                    button.setAttribute('data-command', 'character-' + character_nr);
                    button.appendChild(text);
                    div_btn_group.appendChild(button);
                }
            }
        }
        else {
            console.log('leere Charakter-Liste');
        }
        // Am Schluss noch den Button für die Optionen
        var button_optionen = '<button class="btn btn-nicer-transparent btn-sm remote-character-toggle-button"><span class="glyphicon glyphicon-option-vertical"></span></button>';
        div_btn_group.insertAdjacentHTML('afterend', button_optionen);
    }
    /**
     *
     * @param id
     */
    function markAsActive(id) {
        $('a.active').removeClass('active');
        var find = '*[data-id="' + id + '"]';
        $(find).addClass('active');
    }
    function openList(clientHeight) {
        console.log('open');
        _list_open = true;
        $('#remote-list-wrapper').removeClass('slide-up');
        $('#remote-list-wrapper').addClass('slide-down');
        $('#remote-list-wrapper').css('height', clientHeight + 'px');
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
        var clientHeight = document.getElementById('remote-list-main').clientHeight;
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
    function characterToggleFlip() {
        $('#remote-character.flip-container').toggleClass('flip');
    }
});
