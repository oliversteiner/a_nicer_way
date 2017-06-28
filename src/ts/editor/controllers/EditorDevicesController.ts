class EditorDevicesController {


    public area_open: boolean = true;

    constructor() {
        console.log('EditorDevicesController');

        this.addEventListeners();
        //   this.addKeystrokes();
    }

    /**
     * addEventsListeners
     */
    addEventListeners() {

        // toggle
        $('.devices-area-toggle-button').click(function () {
            EditorDevicesController.toggle()
        });
    }

    // Devices Window
    static
    open() {
        aNWEditor.editorDevicesController.area_open = true;
        $('#slide-devices-area').show();
        $('.devices-area-toggle-button').removeClass('triangle-close').addClass('triangle-open');
    }

    static
    close() {
        aNWEditor.editorDevicesController.area_open = false;
        $('#slide-devices-area').hide();
        $('.devices-area-toggle-button').removeClass('triangle-open').addClass('triangle-close');
    }

    static
    toggle() {
        if (aNWEditor.editorDevicesController.area_open) {
            EditorDevicesController.close();
        }
        else {
            EditorDevicesController.open();
        }
    }


}