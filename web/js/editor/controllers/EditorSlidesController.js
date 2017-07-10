var EditorSlidesController = (function () {
    function EditorSlidesController() {
        // console.log('EditorSlidesController');
        this.area_open = false;
        this.addEventListeners();
        //   this.addKeystrokes();
    }
    /**
     * addEventsListeners
     */
    EditorSlidesController.prototype.addEventListeners = function () {
        // toggle
        $('.tumbnails-area-toggle-button').click(function () {
            EditorSlidesController.toggle();
        });
    };
    // Simulator Window
    EditorSlidesController.open = function () {
        aNWEditor.editorSlidesController.area_open = true;
        $('#slide-tumbnails-area').show();
        $('.tumbnails-area-toggle-button').removeClass('triangle-close').addClass('triangle-open');
    };
    EditorSlidesController.close = function () {
        aNWEditor.editorSlidesController.area_open = false;
        $('#slide-tumbnails-area').hide();
        $('.tumbnails-area-toggle-button').removeClass('triangle-open').addClass('triangle-close');
    };
    EditorSlidesController.toggle = function () {
        if (aNWEditor.editorSlidesController.area_open) {
            EditorSlidesController.close();
        }
        else {
            EditorSlidesController.open();
        }
    };
    /**
     *
     *
     * @param list
     */
    EditorSlidesController.prototype.setList = function (list) {
        // console.log();
        this.timeWayPointList = list;
        this.numberOfSlides = list.length;
    };
    ;
    /**
     *
     */
    EditorSlidesController.prototype.update = function () {
        this.generateSlides();
    };
    /**
     *
     */
    EditorSlidesController.prototype.deleteSlide = function () {
        // console.log('deleteSlide');
    };
    ;
    /**
     *
     */
    EditorSlidesController.prototype.addNewSlide = function () {
        // console.log('numberOfSlides:' + this.numberOfSlides);
        var sequence = this.numberOfSlides;
        this.numberOfSlides++;
        // alter Add-Button in Transition-Button ändern
        var $old_add_wrapper = $('.slide-list-add');
        $old_add_wrapper.removeClass('slide-list-add').addClass('slide-list-transition');
        // leeren
        $old_add_wrapper.html('');
        // neu: transition Button
        var slide_list_transition_button = document.createElement('div');
        slide_list_transition_button.setAttribute('class', 'slide-list-transition-button editor-button');
        // add Click Event
        slide_list_transition_button.addEventListener('click', function () {
            aNWEditor.editorSlidesController.showTransitionMenu(sequence - 1);
        });
        $old_add_wrapper.append(slide_list_transition_button);
        // Slide-list grösse ändern
        var width = (sequence + 1) * 140;
        $('#slide-list').css('width', width + "px");
        // Slide zusammensetzen
        var html = '' +
            '<li>' +
            '<div class="slide-list-wrapper" ' +
            'id="slide-list-wrapper-id-' + sequence + '" ' +
            'data="sequence: ' + sequence + '">' +
            '   <div class="slide-list-tumbnail"></div>' +
            '   <div class="slide-list-sequence">' + sequence + '</div>' +
            '   <div class="slide-list-title">' + sequence + '</div>' +
            '   <div class="slide-list-add">' +
            '   <div class="slide-list-add-button editor-button"></div>' +
            '</div>' +
            '</li>';
        // slide anfügen
        $('#slide-list').append(html);
        // Add-Button aktivieren
        $('.slide-list-add-button').click(function () {
            aNWEditor.editorSlidesController.addNewSlide();
        });
        $('#slide-list-wrapper-id-' + sequence + ' .slide-list-tumbnail').click(function () {
            // console.log('test');
            aNWEditor.editorSlidesController.showSlideDetail(sequence);
        });
    };
    /**
     *
     */
    EditorSlidesController.prototype.showSlideDetail = function (number) {
        // console.log(number);
        // close all other Details:
        $('.slide-list-tumbnail-active').removeClass('slide-list-tumbnail-active');
        // add Div to Wrapper
        var $slide = $('#slide-list-wrapper-id-' + number + ' .slide-list-tumbnail');
        // console.log($slide);
        $slide.addClass('slide-list-tumbnail-active');
        //  aNicerWay.displayController.data.show();
        panels.details.show();
        aNicerWay.goTo(this.timeWayPointList[number]._id);
    };
    ;
    /**
     *
     *
     * @param number
     */
    EditorSlidesController.prototype.showTransitionMenu = function (number) {
        // console.log(number);
    };
    /**
     *
     *
     */
    EditorSlidesController.prototype.generateSlides = function () {
        //
        var elem_container = document.getElementById('slide-list-container');
        // reset
        elem_container.innerHTML = '';
        var list = this.timeWayPointList;
        // ul.slide-list
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'slide-list');
        if (list != null) {
            var anzahl = list.length;
            var width = anzahl * 140;
            ul.style.width = width + "px";
            var _loop_1 = function (i) {
                var doc = list[i];
                // console.log(doc);
                if (doc) {
                    // li > div.slide-list-wrapper
                    // > div.slide-list-tumbnail
                    // > div.slide-list-number
                    // > div.slide-list-title
                    // > div.slide-list-transition
                    // > > div.editor-button slide-list-transition-button
                    // if last:  editor-button-20 slide-list-add-new-button
                    // li
                    var li = document.createElement('li');
                    // Wrapper
                    var div_slide = document.createElement('div');
                    div_slide.setAttribute('class', 'slide-list-wrapper');
                    div_slide.setAttribute('data', 'sequence: ' + doc.sequence);
                    div_slide.setAttribute('id', 'slide-list-wrapper-id-' + doc.sequence);
                    // Tumbnail
                    var slide_list_tumbnail = document.createElement('div');
                    slide_list_tumbnail.setAttribute('class', 'slide-list-tumbnail');
                    slide_list_tumbnail.setAttribute('data', 'slide_sequence: ' + doc.sequence);
                    slide_list_tumbnail.addEventListener('click', function () {
                        aNWEditor.editorSlidesController.showSlideDetail(doc.sequence);
                    });
                    // Sequence
                    var slide_list_sequence = document.createElement('div');
                    slide_list_sequence.setAttribute('class', 'slide-list-sequence');
                    var slide_sequence = document.createTextNode(doc.sequence);
                    slide_list_sequence.appendChild(slide_sequence);
                    // Title
                    var slide_list_title = document.createElement('div');
                    slide_list_title.setAttribute('class', 'slide-list-title');
                    var slide_title = document.createTextNode(doc._id);
                    slide_list_title.appendChild(slide_title);
                    li.appendChild(div_slide);
                    div_slide.appendChild(slide_list_tumbnail);
                    div_slide.appendChild(slide_list_sequence);
                    div_slide.appendChild(slide_list_title);
                    if (i == anzahl - 1) {
                        // Add new
                        var slide_list_add = document.createElement('div');
                        slide_list_add.setAttribute('class', 'slide-list-add');
                        var slide_list_add_button = document.createElement('div');
                        slide_list_add_button.setAttribute('class', 'slide-list-add-button editor-button');
                        slide_list_add.appendChild(slide_list_add_button);
                        div_slide.appendChild(slide_list_add);
                        slide_list_add_button.addEventListener('click', function () {
                            aNWEditor.editorSlidesController.addNewSlide();
                        });
                    }
                    else {
                        // Transition
                        var slide_list_transition = document.createElement('div');
                        slide_list_transition.setAttribute('class', 'slide-list-transition');
                        var slide_list_transition_button = document.createElement('div');
                        slide_list_transition_button.setAttribute('class', 'slide-list-transition-button editor-button');
                        slide_list_transition_button.addEventListener('click', function () {
                            aNWEditor.editorSlidesController.showTransitionMenu(doc.sequence);
                        });
                        slide_list_transition.appendChild(slide_list_transition_button);
                        div_slide.appendChild(slide_list_transition);
                    }
                    // li > div
                    li.appendChild(div_slide);
                    // ul > li
                    ul.appendChild(li);
                } // if doc
                // div > ul
                elem_container.appendChild(ul);
                // addListeners
            };
            // console.log('slide-list - berechnete länge:' + width);
            for (var i = 1; i < (anzahl + 1); i++) {
                _loop_1(i);
            }
        }
        else {
            // console.log('leere Liste');
        }
    };
    return EditorSlidesController;
}());
