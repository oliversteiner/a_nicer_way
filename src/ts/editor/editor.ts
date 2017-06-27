class AnwEditor {

    constructor() {
        console.log('AnwEditor');

        // load
        let editorSimulatorController = new EditorSimulatorController();
        let editorSlidesController = new EditorSlidesController();
        let editorToolbarSideController = new EditorToolbarSideController();
    }

    start() {
    }
}


const aNWEditor = new AnwEditor();