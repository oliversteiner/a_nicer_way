/// <reference path="DbController.ts"/>
/// <reference path="NavigationController.ts"/>
/**
 *  dataDisplayController
 *
 */
// Global
var _dataDisplayName = 'data-display';
var _dataDisplayContentName = 'data-display-content';
var _dataDisplayModalOpen = false;
// Class
var DataDisplayController = (function () {
    /**
     * constructor
     */
    function DataDisplayController() {
        // Vars
        this.elem_Root = document.getElementById(_dataDisplayName);
        this.elem_Content = document.getElementById(_dataDisplayContentName);
        // Views laden
        $(this.elem_Root).load('../views/data_display.html'); // aus dem View-Verzeichnis laden, und gleich ausblenden
        // wenn die Views geladen sind, die UI-Elemente mit den Aktionen verknüpfen
        $('#data-display-ready').ready(function () {
            // Aktionen verknüpfen
            DataDisplayController.makeDraggable();
            DataDisplayController.addAllEventsListeners();
            DataDisplayController.modalClose();
            //
            console.log('- Data Display ready');
        });
    }
    /**
     * addAllEventsListeners
     */
    DataDisplayController.addAllEventsListeners = function () {
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
    };
    /**
     * makeDraggable
     */
    DataDisplayController.makeDraggable = function () {
        $('#' + _dataDisplayContentName).draggable();
        $('#' + _dataDisplayContentName).dblclick(DataDisplayController.modalClose);
    };
    /**
     * resetform
     *  - Leert das Formular
     *
     */
    DataDisplayController.resetForm = function () {
        console.log('DataDisplayController.resetForm');
        $('#_id').val('');
        $('#TimeWayId').val('');
        $('#Date').val('');
        $('#Place').val('');
        $('#Feeling').val('');
        $('#Message').val('');
        $('#Notice').val('');
    };
    /**
     * newForm
     *  - Leert das Formular
     *
     */
    DataDisplayController.newForm = function () {
        console.log('DataDisplayController.newForm');
        DataDisplayController.resetForm();
        $('#info_id').text('NEU');
    };
    /**
     *
     *
     */
    DataDisplayController.saveData = function () {
        console.log('DataDisplayController.saveData');
        // load values from Form
        var _id = $('#_id').val();
        var timewayid = $('#TimeWayId').val();
        var date = $('#Date').val();
        var place = $('#Place').val();
        var feeling = $('#Feeling').val();
        var message = $('#Message').val();
        var notice = $('#Notice').val();
        var data = {
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
    };
    /**
     *
     *
     */
    DataDisplayController.setData = function (id) {
        var promise = DbController.loadWayPoint(id);
        promise.then(function (doc) {
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
    };
    /**
     *
     *
     *
     */
    DataDisplayController.deleteData = function () {
        var _id = $('#_id').val();
        DbController.deleteWayPoint(_id);
        DataDisplayController.resetForm();
        // Die Liste aktualisieren
        setTimeout(function () {
            NavigationController.listAllWayPoints();
        }, 1000);
    };
    /**
     * Fenster
     *
     */
    DataDisplayController.modalClose = function () {
        _dataDisplayModalOpen = false;
        $('#' + _dataDisplayContentName).hide();
    };
    DataDisplayController.modalOpen = function () {
        _dataDisplayModalOpen = true;
        $('#' + _dataDisplayContentName).show();
    };
    DataDisplayController.modalToggle = function () {
        if (_dataDisplayModalOpen) {
            DataDisplayController.modalClose();
        }
        else {
            DataDisplayController.modalOpen();
        }
    };
    return DataDisplayController;
}());
