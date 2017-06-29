class EditorSlidesController {


    public area_open: boolean = false;

    constructor() {
        console.log('EditorSlidesController');

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


        var clicked = false, clickX;

        var $moveable = $('#slide-list-container');

        $moveable.on({
            'mousemove': function(e) {
                clicked && updateScrollPos(e);

            },
            'mousedown': function(e) {
                clicked = true;
                clickX = e.pageX;
            },
            'mouseup': function() {
                clicked = false;
                $('html').css('cursor', 'auto');
            }
        });

        var updateScrollPos = function(e) {
            var $moveable = $('#slide-list-container');

            $('html').css('cursor', 'row-resize');
            $moveable.css({'left': e.pageX});
        }


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


}