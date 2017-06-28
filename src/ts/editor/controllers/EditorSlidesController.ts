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