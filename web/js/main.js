var options = {
    simulator_size: 'mittel',
    check_for_mobile: false // true, false
};
$(document).ready(function () {
    aNicerWay = new ANicerWay(options);
    aNicerWay.start();
});
