/// <reference path="DbController.ts"/>
/// <reference path="NavigationController.ts"/>
/**
 *  dataDisplayController
 *
 */
var DataDisplayController = (function () {
    /**
     * constructor
     */
    function DataDisplayController() {
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
    DataDisplayController.prototype.addAllEventsListeners = function () {
        // Button SAVE
        var buttonSave = document.getElementById('data-display-button-save');
        buttonSave.addEventListener('click', DataDisplayController.saveData, false);
        // Button DELETE
        var buttonDelete = document.getElementById('data-display-button-delete');
        buttonDelete.addEventListener('click', DataDisplayController.deleteData.bind(this), false);
        // Button NEW
        var buttonNew = document.getElementById('data-display-button-new');
        buttonNew.addEventListener('click', DataDisplayController.newForm.bind(this), false);
        // Button Erase DB
        var buttonErase = document.getElementById('data-display-button-erase-db');
        buttonErase.addEventListener('click', DbController.eraseDB, false);
        // Button Load Default
        var buttonDefault = document.getElementById('data-display-button-load-default');
        buttonDefault.addEventListener('click', DbController.loadDefault, false);
    };
    /**
     * madeDraggable
     */
    DataDisplayController.prototype.madeDraggable = function () {
        $(this.elemRoot).draggable();
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
    DataDisplayController.loadData = function (id) {
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
    return DataDisplayController;
}());
