/**
 *  dataDisplayController
 *
 */
// Global
var _dataDisplayName = 'data-display';
var _dataDisplayContentName = 'data-display-content';
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
        console.log('- Data Display load');
        // Aktionen verknüpfen
        this.addEventListeners();
        this.addKeystrokes();
        //
        console.log('- Data Display ready');
    }
    /**
     * addEventsListeners
     */
    DataDisplayController.prototype.addEventListeners = function () {
        // Button SAVE
        $('#data-display-button-save').click(DataDisplayController.saveData);
        // Button DELETE
        $('#data-display-button-delete').click(DataDisplayController.deleteData);
        // Button NEW
        $('#data-display-button-new').click(DataDisplayController.newForm);
        // Button Erase DB
        $('#data-display-button-erase-db').click(PouchDBService.eraseDB);
        // Button Load Default
        $('#data-display-button-load-default').click(PouchDBService.loadDefault);
    };
    /**
     * addKeystrokes
     */
    DataDisplayController.prototype.addKeystrokes = function () {
    };
    /**
     * resetform
     *  - Leert das Formular
     *
     */
    DataDisplayController.resetForm = function () {
        console.log('DataDisplayController.resetForm');
        $('#twp-data-id').val('');
        $('#twp-data-timeWayId').val('');
        $('#twp-data-date').val('');
        $('#twp-data-place').val('');
        $('#twp-data-feeling').val('');
        $('#twp-data-message').val('');
        $('#twp-data-notice').val('');
    };
    /**
     * newForm
     *  - Leert das Formular
     *
     */
    DataDisplayController.newForm = function () {
        DataDisplayController.resetForm();
        $('#twp-data-info_id').text('NEU');
    };
    /**
     *
     *
     */
    DataDisplayController.saveData = function () {
        // load values from form
        var _id = $('#twp-data-id').val();
        var sequence = $('#twp-data-sequence').val();
        var date = $('#twp-data-date').val();
        var place = $('#twp-data-place').val();
        var feeling = $('#twp-data-feeling').val();
        var message = $('#twp-data-message').val();
        var notice = $('#twp-data-notice').val();
        var data = {
            _id: _id,
            sequence: sequence,
            date: date,
            place: place,
            feeling: feeling,
            message: message,
            notice: notice,
        };
        // wenn _id leer ist, wird es ein neuer eintrag in die db
        console.log('--- _id= ' + _id);
        if (_id == "") {
            // new
            console.log('--- new');
            aNicerWay.bcontroller.addwaypoint(data);
        }
        else {
            // update
            console.log('--- update');
            aNicerWay.dbcontroller.updatewaypoint(data);
        }
        // die liste aktualisieren
        setTimeout(function () {
            aNicerWay.update();
        }, 1000);
    };
    /**
     *
     *
     */
    DataDisplayController.setData = function (doc) {
        $('#twp-data-id').attr('placeholder', '').val(doc._id);
        $('#twp-data-sequence').attr('placeholder', '').val(doc.sequence);
        $('#twp-data-date').attr('placeholder', '').val(doc.date);
        $('#twp-data-place').attr('placeholder', '').val(doc.place);
        $('#twp-data-feeling').attr('placeholder', '').val(doc.feeling);
        $('#twp-data-message').attr('placeholder', '').val(doc.message);
        $('#twp-data-notice').attr('placeholder', '').val(doc.notice);
        $('#twp-data-info_id').html(doc._id);
    };
    /**
     *
     *
     *
     */
    DataDisplayController.deleteData = function () {
        var _id = $('#twp-data-id').val();
        pouchDBService.deleteWayPoint(_id);
        DataDisplayController.resetForm();
        // Die Liste aktualisieren
        setTimeout(function () {
            aNicerWay.update();
        }, 1000);
    };
    return DataDisplayController;
}());
