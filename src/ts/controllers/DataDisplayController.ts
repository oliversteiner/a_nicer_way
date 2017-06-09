/// <reference path="DbController.ts"/>
/// <reference path="NavigationController.ts"/>

/**
 *  dataDisplayController
 *
 */
class DataDisplayController {

    public className: string;
    private elemRoot: any;
    public idName: string;

    /**
     * constructor
     */
    constructor() {


        // Vars
        this.className = 'dataDisplayController';
        this.idName = 'data-display';
        this.elemRoot = document.getElementById(this.idName);


        // functions
        this.addAllEventsListeners();
        this.madeDraggable();

        // debug
        console.log(this.className);
    }

    /**
     * addAllEventsListeners
     */
    addAllEventsListeners() {


        // Button SAVE
        let buttonSave = document.getElementById('data-display-button-save');
        buttonSave.addEventListener('click', DataDisplayController.saveData, false);

        // Button DELETE
        let buttonDelete = document.getElementById('data-display-button-delete');
        buttonDelete.addEventListener('click', DataDisplayController.deleteData.bind(this), false);

        // Button NEW
        let buttonNew = document.getElementById('data-display-button-new');
        buttonNew.addEventListener('click', DataDisplayController.newForm.bind(this), false);

        // Button Erase DB
        let buttonErase = document.getElementById('data-display-button-erase-db');
        buttonErase.addEventListener('click', DbController.eraseDB, false);


        // Button Load Default
        let buttonDefault = document.getElementById('data-display-button-load-default');
        buttonDefault.addEventListener('click', DbController.loadDefault, false);

    }

    /**
     * madeDraggable
     */
    madeDraggable() {
        $(this.elemRoot).draggable();
    }

    /**
     * resetform
     *  - Leert das Formular
     *
     */
    static resetForm() {
        console.log('DataDisplayController.resetForm');


        $('#_id').val('');
        $('#TimeWayId').val('');
        $('#Date').val('');
        $('#Place').val('');
        $('#Feeling').val('');
        $('#Message').val('');
        $('#Notice').val('');
    }

    /**
     * newForm
     *  - Leert das Formular
     *
     */
    static newForm() {
        console.log('DataDisplayController.newForm');

        DataDisplayController.resetForm();

        $('#info_id').text('NEU');

    }

    /**
     *
     *
     */
    static saveData() {
        console.log('DataDisplayController.saveData');

        // load values from Form
        let _id = $('#_id').val();
        let timewayid = $('#TimeWayId').val();
        let date = $('#Date').val();
        let place = $('#Place').val();
        let feeling = $('#Feeling').val();
        let message = $('#Message').val();
        let notice = $('#Notice').val();


        let data = {
            _id: _id,
            timewayid: timewayid,
            date: date,
            place: place,
            feeling: feeling,
            message: message,
            notice: notice,
        };

        // Wenn _id leer ist, wird es ein neuer Eintrag in die DB
        console.log('--- _id= ' + _id);

        if (_id == "") {
            // New
            console.log('--- new');
            DbController.addWayPoint(data);
        }
        else {
            // Update
            console.log('--- update');
            DbController.updateWayPoint(data);

        }

        // Die Liste aktualisieren
        setTimeout(function () {
            NavigationController.listAllWayPoints();
        }, 1000);

    }


    /**
     *
     *
     */
    static loadData(id: string) {


        let promise = DbController.loadWayPoint(id);
        promise.then(function (doc: any) {

            // load

            $('#_id').attr('placeholder', '').val(doc._id);
            $('#TimeWayId').attr('placeholder', '').val(doc.timewayid);
            $('#Date').attr('placeholder', '').val(doc.date);
            $('#Place').attr('placeholder', '').val(doc.place);
            $('#Feeling').attr('placeholder', '').val(doc.feeling);
            $('#Message').attr('placeholder', '').val(doc.message);
            $('#Notice').attr('placeholder', '').val(doc.notice);

            $('#info_id').html(doc._id);
        });


    }

    /**
     *
     *
     *
     */
    static deleteData() {

        let _id = $('#_id').val();

        DbController.deleteWayPoint(_id);

        DataDisplayController.resetForm();


        // Die Liste aktualisieren
        setTimeout(function () {
            NavigationController.listAllWayPoints();
        }, 1000);
    }


}