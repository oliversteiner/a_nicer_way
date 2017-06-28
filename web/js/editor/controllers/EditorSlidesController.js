var EditorSlidesController = (function () {
    function EditorSlidesController() {
        this.area_open = false;
        console.log('EditorSlidesController');
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
    return EditorSlidesController;
}());
