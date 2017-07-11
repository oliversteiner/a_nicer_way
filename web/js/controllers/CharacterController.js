var _fired = false;
var CharacterController = (function () {
    function CharacterController() {
        this.loadCharacterList();
        this.generateCharacters();
        this.walk();
        this.generateButtons();
        this.addEventListeners();
        // Scroll
        setTimeout(function () {
            aNicerWay.characterController.changeCharacter(1);
            aNicerWay.characterController.addKeystrokes();
        }, 400);
    }
    /**
     *
     *
     */
    CharacterController.prototype.addEventListeners = function () {
        // start
        $('.character-change-button').click(function () {
            var data = $(this).data('character');
            aNicerWay.characterController.changeCharacter(data);
        });
    };
    /**
     * addKeystrokes
     */
    CharacterController.prototype.addKeystrokes = function () {
        var list = this.character_list;
        var charcodes_num = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var _loop_1 = function (i) {
            var keycode = charcodes_num[i];
            key(keycode, function () {
                aNicerWay.characterController.changeCharacter(keycode);
            });
        };
        for (var i = 0; i < list.length && i < charcodes_num.length; i++) {
            _loop_1(i);
        }
        // winken
        key('w', function () {
            aNicerWay.characterController.wink();
        });
        // toggle Mobile
        key('m', function () {
            aNicerWay.characterController.toggleMobile();
        });
    };
    /**
     *
     *
     *
     * @param input
     */
    CharacterController.prototype.action = function (input) {
        switch (input) {
            case 'walk':
                aNicerWay.characterController.walk();
                break;
            case 'wink':
                aNicerWay.characterController.wink();
                break;
            case 'wait':
                aNicerWay.characterController.toggleMobile();
                break;
            default:
                break;
        }
    };
    /**
     *
     *
     */
    CharacterController.prototype.wink = function () {
        $('.character-active').addClass('wink');
        $('.character-active').removeClass('wate');
        setTimeout(function () {
            $('.character-active').removeClass('wink');
            $('.character-active').addClass('wate');
        }, 3000);
    };
    /**
     *
     *
     */
    CharacterController.prototype.walk = function () {
        $('#timeway-content').scroll(function () {
            console.log(aNicerWay.timeWayController.scroll_direction);
            // fire only once
            if (_fired === false) {
                $('.character').removeClass('wate mobile wink');
                if (aNicerWay.timeWayController.scroll_direction == "right") {
                    $('.character').addClass('walk-forward');
                }
                else {
                    $('.character').addClass('walk-backward');
                }
                _fired = true;
            }
            clearTimeout($.data(this, "scrollCheck"));
            $.data(this, "scrollCheck", setTimeout(function () {
                $('.character').addClass('wate');
                $('.character').removeClass('walk-forward walk-backward');
                // reset
                _fired = false;
            }, 100));
        });
    };
    CharacterController.prototype.mobile = function () {
        $('.character-active').removeClass('wate');
        $('.character-active').addClass('mobile');
    };
    CharacterController.prototype.toggleMobile = function () {
        var check = $('.character-active').hasClass('mobile');
        if (check) {
            $('.character-active').removeClass('mobile');
            $('.character-active').addClass('wate');
        }
        else {
            this.mobile();
        }
    };
    CharacterController.prototype.talk = function (text) {
        $('.speech-bubble').show();
        $('.speech-bubble').addClass('blobup');
        setTimeout(function () {
            $('.speech-bubble').html(text);
        }, 500);
    };
    CharacterController.prototype.dontTalk = function () {
        $('.speech-bubble').removeClass('blobup');
        //leeren
        $('.speech-bubble').html('');
    };
    /**
     *
     *
     * @param elem
     */
    CharacterController.prototype.flipDown = function (elem) {
        $(elem).addClass('flipdown');
        setTimeout(function () {
            // nach Ende der Animation ausblenden
            $(elem).hide();
            $(elem).removeClass('flipdown');
        }, 300);
    };
    /**
     *
     *
     * @param elem
     */
    CharacterController.prototype.flipUp = function (elem) {
        $(elem).show();
        $(elem).addClass('flipup');
        $(elem).addClass('character-active');
        setTimeout(function () {
            // nach ende der animation ausblenden
            $(elem).removeClass('flipup');
            $(elem).click(function () {
                aNicerWay.characterController.wink();
            });
        }, 300);
    };
    /**
     *
     *
     * @param number
     */
    CharacterController.prototype.changeCharacter = function (number) {
        var elem_old = $('.character-active').attr('id');
        $('.character-active').removeClass('character-active');
        // Wenn keiner Da
        if (number == null || number == 0) {
            // Aus der Liste den ersten nehmen
            this.flipDown('#' + elem_old);
        }
        else {
            // Das Array fängt mit 0 an
            number--;
            var character_id = this.character_list[number].id;
            var elem_new_1 = '#' + character_id;
            // nicht mehr aktiv
            // Alte Figur weg
            this.flipDown('#' + elem_old);
            // nach ende Animation
            setTimeout(function () {
                // neue Figur holen
                aNicerWay.characterController.flipUp(elem_new_1);
            }, 600);
        }
    };
    /**
     *
     *
     * @returns {({name: string, id: string, image: string, image_walking: string, color: string, animate: {walk: string, wink: string, talk: string, wait: string}}|{name: string, id: string, image: string, color: string}|{name: string, id: string, image: string, color: string})[]}
     */
    CharacterController.prototype.loadCharacterList = function () {
        var character_list = [
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
        this.character_list = character_list;
        return character_list;
    };
    /**
     *
     *
     *
     */
    CharacterController.prototype.generateButtons = function () {
        //
        var elemNav = document.getElementById('character-navigation');
        // reset nav
        elemNav.innerHTML = '';
        // Button Group
        var div_btn_group = document.createElement('div');
        div_btn_group.setAttribute('class', 'btn-group btn-group-inline');
        // div > div.btn-group
        elemNav.appendChild(div_btn_group);
        // ausblen
        var button_0 = '<button class="character-change-button btn btn-default btn-sm" data-character="0"><span class="glyphicon glyphicon-ban-circle"></span></button>';
        div_btn_group.innerHTML = button_0;
        var list = this.character_list;
        if (list != null) {
            for (var i = 0, len = list.length; i < len; i++) {
                var character = list[i];
                var character_nr = i + 1;
                if (character) {
                    var button = document.createElement('button');
                    var text = document.createTextNode(character.name);
                    button.setAttribute('class', 'character-change-button btn btn-default btn-sm ');
                    button.setAttribute('data-character', character_nr);
                    button.appendChild(text);
                    div_btn_group.appendChild(button);
                }
            }
        }
        else {
            console.log('leere Charakter-Liste');
        }
        // Am Schluss noch den Button für die Optionen
        var button_optionen = '<button class="btn btn-nicer-transparent btn-sm flip-toggle-button"><span class="glyphicon glyphicon-option-vertical"></span></button>';
        div_btn_group.insertAdjacentHTML('afterend', button_optionen);
    };
    /**
     *
     *
     *
     */
    CharacterController.prototype.generateCharacters = function () {
        //
        var elemNav = document.getElementById('layer-character');
        // reset nav
        elemNav.innerHTML = '';
        var list = this.character_list;
        if (list != null) {
            for (var i = 0, len = list.length; i < len; i++) {
                var character = list[i];
                if (character) {
                    var div_char = document.createElement('div');
                    div_char.setAttribute('id', character.id);
                    div_char.setAttribute('class', 'character wate');
                    div_char.setAttribute('style', 'display:none;');
                    elemNav.appendChild(div_char);
                    // Speachbubble
                    var div_bubble = document.createElement('div');
                    div_bubble.setAttribute('class', 'speech-bubble bubble-right');
                    div_bubble.setAttribute('style', 'display:none;');
                    var div_text = document.createElement('div');
                    div_bubble.appendChild(div_text);
                    div_char.appendChild(div_bubble);
                }
            }
        }
        else {
            console.log('leere Charakter-Liste');
        }
    };
    return CharacterController;
}());
