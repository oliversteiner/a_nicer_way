/// <reference path="DbController.ts"/>
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
        this.elem = document.getElementById(this.idName);
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
        // Button Submit Form
        var buttonSave = document.getElementById('data-display-button-save');
        buttonSave.addEventListener('click', this.sendData, false);
        // Button Submit Form
        var buttonDelete = document.getElementById('data-display-button-delete');
        buttonDelete.addEventListener('click', this.deleteData, false);
    };
    /**
     * madeDraggable
     */
    DataDisplayController.prototype.madeDraggable = function () {
        $(this.elem).draggable();
    };
    /**
     *
     *
     */
    DataDisplayController.prototype.sendData = function () {
        // load Form
        var timewayid = $('#TimeWayId').val();
        var date = $('#Date').val();
        var place = $('#Place').val();
        var feeling = $('#Feeling').val();
        var message = $('#Message').val();
        var notice = $('#Notice').val();
        var data = {
            timewayid: timewayid,
            date: date,
            place: place,
            feeling: feeling,
            message: message,
            notice: notice,
        };
        var dbController = new DbController();
        dbController.addWayPoint(data);
        // alert(form);
        console.log('sendData:');
        console.log('-' + notice);
    };
    /**
     *
     *
     */
    DataDisplayController.loadData = function (id) {
        var dbController = new DbController();
        dbController.db.get(id).then(function (doc) {
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
     * @param id
     */
    DataDisplayController.prototype.deleteData = function () {
        var _id = $('#_id').val();
        var data = {
            _id: _id,
        };
        var dbController = new DbController();
        var result = dbController.deleteWayPoint(data);
        if (result) {
            $('#_id').val('');
            $('#TimeWayId').val('');
            $('#Date').val('');
            $('#Place').val('');
            $('#Feeling').val('');
            $('#Message').val('');
            $('#Notice').val('');
        }
        // alert(form);
        console.log('deleteData');
    };
    /**
     * set
     *
     */
    DataDisplayController.prototype.set = function () {
        // Test
        console.log(' - ' + this.className + '.set()');
    };
    /**
     * get
     *
     */
    DataDisplayController.prototype.get = function () {
        // Test
        console.log(' - ' + this.className + '.get()');
    };
    return DataDisplayController;
}());
