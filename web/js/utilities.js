function _reset() {
    // DbController.loadDefault();
    console.log('***** reset');
    // Datenbank leeren
    //   DbController.eraseDB();
    // Datenbank neu einlesen
    DbController.loadDefault();
    // Zeige die Prozess-bar
    $('#modal-Init-DB').modal('show');
    $('.init-DB-message-wrapper').hide();
    $('.progress-wrapper').show();
    // Animiere die Prozessbar
    $('.progress-bar').each(function () {
        var $bar = $(this);
        var progress = setInterval(function () {
            var currWidth = parseInt($bar.attr('aria-valuenow'));
            var maxWidth = parseInt($bar.attr('aria-valuemax'));
            var maxtimer = maxWidth + 25;
            //update the progress
            $bar.width(currWidth + '%');
            $bar.attr('aria-valuenow', currWidth + 5);
            //clear timer when max is reach
            if (currWidth >= maxtimer) {
                clearInterval(progress);
                $('#modal-Init-DB').modal('hide');
                $('.init-DB-message-wrapper').show();
                $('.progress-wrapper').hide();
                // Seite neu initialisieren
            }
        }, 100);
    });
    return false;
}
