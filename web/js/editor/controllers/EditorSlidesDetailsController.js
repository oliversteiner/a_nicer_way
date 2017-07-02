var EditorSlidesDetailsController = (function () {
    function EditorSlidesDetailsController() {
    }
    EditorSlidesDetailsController.prototype.open = function () {
        aNicerWay.displayController.data.show();
    };
    EditorSlidesDetailsController.prototype.close = function () {
        aNicerWay.displayController.data.close();
    };
    return EditorSlidesDetailsController;
}());
