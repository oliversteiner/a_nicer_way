var EditorDevicesController = (function () {
    function EditorDevicesController() {
        this.area_devices_open = false;
        console.log('EditorDevicesController');
        this.addEventListeners();
        //   this.addKeystrokes();
    }
    /**
     * addEventsListeners
     */
    EditorDevicesController.prototype.addEventListeners = function () {
        // toggle
        $('.devices-area-toggle-button').click(function () {
            EditorDevicesController.toggle();
        });
    };
    // Devices Window
    EditorDevicesController.open = function () {
        aNWEditor.editorDevicesController.area_devices_open = true;
        $('#slide-devices-area').show();
        $('.devices-area-toggle-button').removeClass('triangle-close').addClass('triangle-open');
    };
    EditorDevicesController.close = function () {
        aNWEditor.editorDevicesController.area_devices_open = false;
        $('#slide-devices-area').hide();
        $('.devices-area-toggle-button').removeClass('triangle-open').addClass('triangle-close');
    };
    EditorDevicesController.toggle = function () {
        if (aNWEditor.editorDevicesController.area_devices_open) {
            EditorDevicesController.close();
        }
        else {
            EditorDevicesController.open();
        }
    };
    EditorDevicesController.prototype.setList = function (list) {
        this.timeWayPointList = list;
    };
    ;
    return EditorDevicesController;
}());
