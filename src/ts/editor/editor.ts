class AnwEditor {
    private editorDevicesController: EditorDevicesController;
    private editorSlidesController: EditorSlidesController;
    private editorToolbarSideController: EditorToolbarSideController;


    constructor() {
        console.log('AnwEditor');

        // load
        this.editorDevicesController = new EditorDevicesController();
        this.editorSlidesController = new EditorSlidesController();
        this.editorToolbarSideController = new EditorToolbarSideController();
    }

    start() {
    }
}

