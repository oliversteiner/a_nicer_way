class DisplayController{

    constructor(){


        this.makeDraggable();
        this.addEventListeners();
    }



    addEventListeners() {

    }

    /**
     * addKeystrokes
     */
    addKeystrokes() {

        key('c', function () {
        });
    }

    /**
     * makeDraggable
     */
    makeDraggable() {
        $('#character-display-content').draggable();
        $('#character-display-content').dblclick();
    }


     modalClose() {


    }

     modalOpen() {

    }


     modalToggle() {

        let test = 'test';

        if (test) {
            this.modalClose();
        }
        else {
            this.modalOpen();
        }
    }

    test(){

    }
}