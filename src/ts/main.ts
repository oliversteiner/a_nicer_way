declare let aNicerWay:any;

let options = {
    simulator_size: 'mittel', // klein, mittel, gross
    check_for_mobile: false // true, false
};


$(document).ready(function () {
    aNicerWay = new ANicerWay(options);
    aNicerWay.start();





});


