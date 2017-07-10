class EditorSlidesController {
    numberOfSlides: any;


    public area_open: boolean = false;
    private timeWayPointList: any;

    constructor() {
        // console.log('EditorSlidesController');

        this.addEventListeners();
        //   this.addKeystrokes();
    }

    /**
     * addEventsListeners
     */
    addEventListeners() {

        // toggle
        $('.tumbnails-area-toggle-button').click(function () {
            EditorSlidesController.toggle()
        });


    }

    // Simulator Window
    static
    open() {
        aNWEditor.editorSlidesController.area_open = true;
        $('#slide-tumbnails-area').show();
        $('.tumbnails-area-toggle-button').removeClass('triangle-close').addClass('triangle-open');

    }

    static
    close() {
        aNWEditor.editorSlidesController.area_open = false;
        $('#slide-tumbnails-area').hide();
        $('.tumbnails-area-toggle-button').removeClass('triangle-open').addClass('triangle-close');

    }

    static
    toggle() {
        if (aNWEditor.editorSlidesController.area_open) {
            EditorSlidesController.close();
        }
        else {
            EditorSlidesController.open();
        }
    }

    /**
     *
     *
     * @param list
     */
    setList(list: any) {
        // console.log();
        this.timeWayPointList = list;
        this.numberOfSlides = list.length;
    };


    /**
     *
     */
    update() {
        this.generateSlides();
    }

    /**
     *
     */
    deleteSlide() {
        // console.log('deleteSlide');
    };

    /**
     *
     */
    addNewSlide() {
        // console.log('numberOfSlides:' + this.numberOfSlides);
        const sequence = this.numberOfSlides;
        this.numberOfSlides++;

        // alter Add-Button in Transition-Button ändern
        let $old_add_wrapper = $('.slide-list-add');
        $old_add_wrapper.removeClass('slide-list-add').addClass('slide-list-transition');

        // leeren
        $old_add_wrapper.html('');

        // neu: transition Button
        let slide_list_transition_button = document.createElement('div');
        slide_list_transition_button.setAttribute('class', 'slide-list-transition-button editor-button');

        // add Click Event
        slide_list_transition_button.addEventListener('click', function () {
            aNWEditor.editorSlidesController.showTransitionMenu(sequence - 1)
        });
        $old_add_wrapper.append(slide_list_transition_button);


        // Slide-list grösse ändern
        let width = (sequence + 1) * 140;
        $('#slide-list').css('width', width + "px");


        // Slide zusammensetzen
        let html = '' +
            '<li>' +
            '<div class="slide-list-wrapper" ' +
            'id="slide-list-wrapper-id-'+sequence+'" ' +
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

        $('#slide-list-wrapper-id-'+sequence+' .slide-list-tumbnail').click( function () {
            // console.log('test');
            aNWEditor.editorSlidesController.showSlideDetail(sequence)
        });


    }

    /**
     *
     */
    showSlideDetail(number: number) {
        // console.log(number);

        // close all other Details:
        $('.slide-list-tumbnail-active').removeClass('slide-list-tumbnail-active');

        // add Div to Wrapper
        const $slide = $('#slide-list-wrapper-id-'+number+ ' .slide-list-tumbnail');

        // console.log($slide);

        $slide.addClass('slide-list-tumbnail-active');
      //  aNicerWay.displayController.data.show();
        panels.details.show();

        aNicerWay.goTo(this.timeWayPointList[number]._id);

    };

    /**
     *
     *
     * @param number
     */
    showTransitionMenu(number: number) {
        // console.log(number);

    }

    /**
     *
     *
     */
    generateSlides() {

        //
        let elem_container = document.getElementById('slide-list-container');

        // reset
        elem_container.innerHTML = '';

        let list = this.timeWayPointList;

        // ul.slide-list
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'slide-list');


        if (list != null) {

            let anzahl = list.length;
            let width = anzahl * 140;
            ul.style.width = width + "px";
            // console.log('slide-list - berechnete länge:' + width);


            for (let i = 1; i < (anzahl + 1); i++) {
                let doc = list[i];

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
                    const li = document.createElement('li');

                    // Wrapper
                    const div_slide = document.createElement('div');
                    div_slide.setAttribute('class', 'slide-list-wrapper');
                    div_slide.setAttribute('data', 'sequence: ' + doc.sequence);
                    div_slide.setAttribute('id', 'slide-list-wrapper-id-' + doc.sequence);

                    // Tumbnail
                    const slide_list_tumbnail = document.createElement('div');
                    slide_list_tumbnail.setAttribute('class', 'slide-list-tumbnail');
                    slide_list_tumbnail.setAttribute('data', 'slide_sequence: ' + doc.sequence);
                    slide_list_tumbnail.addEventListener('click', function () {
                        aNWEditor.editorSlidesController.showSlideDetail(doc.sequence)
                    });

                    // Sequence
                    const slide_list_sequence = document.createElement('div');
                    slide_list_sequence.setAttribute('class', 'slide-list-sequence');
                    const slide_sequence = document.createTextNode(doc.sequence);
                    slide_list_sequence.appendChild(slide_sequence);


                    // Title
                    const slide_list_title = document.createElement('div');
                    slide_list_title.setAttribute('class', 'slide-list-title');
                    const slide_title = document.createTextNode(doc._id);
                    slide_list_title.appendChild(slide_title);


                    li.appendChild(div_slide);

                    div_slide.appendChild(slide_list_tumbnail);
                    div_slide.appendChild(slide_list_sequence);
                    div_slide.appendChild(slide_list_title);

                    if (i == anzahl - 1) {

                        // Add new
                        let slide_list_add = document.createElement('div');
                        slide_list_add.setAttribute('class', 'slide-list-add');
                        let slide_list_add_button = document.createElement('div');
                        slide_list_add_button.setAttribute('class', 'slide-list-add-button editor-button');
                        slide_list_add.appendChild(slide_list_add_button);

                        div_slide.appendChild(slide_list_add);

                        slide_list_add_button.addEventListener('click', function () {
                            aNWEditor.editorSlidesController.addNewSlide()
                        });

                    } else {

                        // Transition
                        let slide_list_transition = document.createElement('div');
                        slide_list_transition.setAttribute('class', 'slide-list-transition');
                        let slide_list_transition_button = document.createElement('div');
                        slide_list_transition_button.setAttribute('class', 'slide-list-transition-button editor-button');
                        slide_list_transition_button.addEventListener('click', function () {
                            aNWEditor.editorSlidesController.showTransitionMenu(doc.sequence)
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


            }


        }
        else {
            // console.log('leere Liste');
        }


    }


}