/// <reference path="DbController.ts"/>
/// <reference path="NavigationController.ts"/>

/**
 *  dataDisplayController
 *
 */

// Global
const _dataDisplayName: string = 'data-display';
const _dataDisplayContentName: string = 'data-display-content';
let _dataDisplayModalOpen: boolean = false;

// Class
class DataDisplayController {

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.elem_Root = document.getElementById(_dataDisplayName);
        this.elem_Content = document.getElementById(_dataDisplayContentName);

        // Views laden


        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#data-display-ready').ready(function () {
                console.log('- Data Display load');

                // Aktionen verknüpfen
                DataDisplayController.makeDraggable();
                DataDisplayController.addAllEventsListeners();
                DataDisplayController.modalClose();

                //
                console.log('- Data Display ready');
            }
        )


    }

    /**
     * addAllEventsListeners
     */
    static addAllEventsListeners() {


        // Button SAVE
        $('#data-display-button-save').click(DataDisplayController.saveData);

        // Button DELETE
        $('#data-display-button-delete').click(DataDisplayController.deleteData);

        // Button NEW
        $('#data-display-button-new').click(DataDisplayController.newForm);

        // Button Erase DB
        $('#data-display-button-erase-db').click(DbController.eraseDB);

        // Button Load Default
        $('#data-display-button-load-default').click(DbController.loadDefault);

        // Button Close Display
        $('.data-display-button-close').click(DataDisplayController.modalClose);

        // Button Show Display
        $('.data-display-button-toggle').click(DataDisplayController.modalToggle);

    }

    /**
     * makeDraggable
     */
    static  makeDraggable() {

        $('#' + _dataDisplayContentName).draggable().dblclick(DataDisplayController.modalClose);

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
    static setData(id: string) {

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


    /**
     * Fenster
     *
     */
    static modalClose() {
        _dataDisplayModalOpen = false;
        $('#' + _dataDisplayContentName).hide();

    }

    static modalOpen() {
        _dataDisplayModalOpen = true;
        $('#' + _dataDisplayContentName).show();
        $('#data-display-content').show();
    }

    static modalToggle() {
        if (_dataDisplayModalOpen) {
            DataDisplayController.modalClose();
        }
        else {
            DataDisplayController.modalOpen();
        }
    }


}