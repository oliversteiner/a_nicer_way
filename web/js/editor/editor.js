var AnwEditor = (function () {
    function AnwEditor() {
        console.log('AnwEditor');
        // load
        this.editorDevicesController = new EditorDevicesController();
        this.editorSlidesController = new EditorSlidesController();
        this.editorToolbarSideController = new EditorToolbarSideController();
    }
    AnwEditor.prototype.start = function () {
        //   EditorSlidesController.open();
    };
    AnwEditor.prototype.addEventListeners = function () {
        // toggle
        $('.tumbnails-area-toggle-button').click(function () {
            // editor modus
            EditorSlidesController.toggle();
        });
    };
    return AnwEditor;
}());
