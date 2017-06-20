/**
 *  helpController
 *
 */

// Global
const _helpName: string = 'help-container';
const _helpContentName: string = 'help-content';
let _helpModalOpen: boolean = false;

// Class
class HelpController {

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;

    /**
     * constructor
     */
    constructor() {

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
    static addKeystrokes() {
        key('h', function () {
            HelpController.modalToggle();
        });
    }


    /**
     * Fenster
     *
     */
    static modalClose() {
        _helpModalOpen = false;
        $('#help-modal').modal('hide');

    }

    static modalOpen() {
        _helpModalOpen = true;
        $('#help-modal').modal('show');
    }

    static modalToggle() {
        if (_helpModalOpen) {
            HelpController.modalClose();
        }
        else {
            HelpController.modalOpen();
        }
    }
}