var DisplayController = (function () {
    function DisplayController() {
        this.makeDraggable();
        this.addEventListeners();
    }
    DisplayController.prototype.addEventListeners = function () {
    };
    /**
     * addKeystrokes
     */
    DisplayController.prototype.addKeystrokes = function () {
        key('c', function () {
        });
    };
    /**
     * makeDraggable
     */
    DisplayController.prototype.makeDraggable = function () {
        $('#character-display-content').draggable();
        $('#character-display-content').dblclick();
    };
    DisplayController.prototype.modalClose = function () {
    };
    DisplayController.prototype.modalOpen = function () {
    };
    DisplayController.prototype.modalToggle = function () {
        var test = 'test';
        if (test) {
            this.modalClose();
        }
        else {
            this.modalOpen();
        }
    };
    DisplayController.prototype.test = function () {
    };
    return DisplayController;
}());
