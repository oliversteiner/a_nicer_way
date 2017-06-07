/// <reference path="DbController.ts"/>

/**
 *  dataDisplayController
 *
 */
class DataDisplayController {

    public className: string;
    private elem: any;
    public idName: string;

    /**
     * constructor
     */
    constructor() {


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
    addAllEventsListeners() {


        // Button Submit Form
        let buttonSave = document.getElementById('data-display-button-save');
        buttonSave.addEventListener('click', this.sendData, false);

        // Button Submit Form
        let buttonDelete = document.getElementById('data-display-button-delete');
        buttonDelete.addEventListener('click', this.deleteData, false);

    }

    /**
     * madeDraggable
     */
    madeDraggable() {
        $(this.elem).draggable();
    }

    /**
     *
     *
     */
    sendData() {

        // load Form

        let timewayid = $('#TimeWayId').val();
        let date = $('#Date').val();
        let place = $('#Place').val();
        let feeling = $('#Feeling').val();
        let message = $('#Message').val();
        let notice = $('#Notice').val();


        let data = {
            timewayid: timewayid,
            date: date,
            place: place,
            feeling: feeling,
            message: message,
            notice: notice,
        };

        let dbController = new DbController();

        dbController.addWayPoint(data);

        // alert(form);
        console.log('sendData:');
        console.log('-' + notice);
    }


    /**
     *
     *
     */
    static loadData(id: string) {


        let dbController = new DbController();

        dbController.db.get(id).then(function (doc: any) {



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
     * @param id
     */
    deleteData() {

        let _id = $('#_id').val();

        let data = {
            _id: _id,
        };

        let dbController = new DbController();

        let result = dbController.deleteWayPoint(data);

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
    }


    /**
     * set
     *
     */
    set() {
        // Test
        console.log(' - ' + this.className + '.set()');
    }

    /**
     * get
     *
     */
    get() {
        // Test
        console.log(' - ' + this.className + '.get()');
    }


}