/**
 *  helpController
 *
 */
// Global
var _helpName = 'help-container';
var _helpContentName = 'help-content';
var _helpModalOpen = false;
// Class
var HelpController = (function () {
    /**
     * constructor
     */
    function HelpController() {
        // Vars
        this.elem_Root = document.getElementById(_helpName);
        this.elem_Content = document.getElementById(_helpContentName);
        console.log('- Help Modal load');
        // Aktionen verknüpfen
        HelpController.addKeystrokes();
        HelpController.modalClose();
        //
        console.log('- Help Modal ready');
    }
    /**
     * addKeystrokes
     */
    HelpController.addKeystrokes = function () {
        key('h', function () {
            HelpController.modalToggle();
        });
    };
    /**
     * Fenster
     *
     */
    HelpController.modalClose = function () {
        _helpModalOpen = false;
        $('#help-modal').modal('hide');
    };
    HelpController.modalOpen = function () {
        _helpModalOpen = true;
        $('#help-modal').modal('show');
    };
    HelpController.modalToggle = function () {
        if (_helpModalOpen) {
            HelpController.modalClose();
        }
        else {
            HelpController.modalOpen();
        }
    };
    return HelpController;
}());
