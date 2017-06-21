/**
 * Created by ost on 20.06.17.
 */

class TimerController {

    private countFrom: number;
    private progress: number;
    private unit: string; // minutes or seconds

    // Status
    private stage_3: number;
    private stage_2: number;
    private stage_1: number;

    // interval
    public anwTimer: any;


    /**
     *
     */
    constructor() {

        this.countFrom = 15;
        this.progress = 0;
        this.unit = 'minutes';

        // Status
        this.stage_3 = 10;      // red
        this.stage_2 = 5;     // yellow
        this.stage_1 = 0;     //green


        // Daten vorbereiten:
        this.setTime();

    }


    addEventListeners() {

        // start
        $('.timer-start-button').click(function () {
            timerController.start();
        });

        // pause
        $('.timer-pause-button').click(function () {
            timerController.pause()
        });

        // stop
        $('.timer-stop-button').click(function () {
            timerController.stop();
        });

        // settings
        $('.timer-settings-button').click(function () {
            timerController.settings();
        });

        // toggle Unit
        $('.timer-unit').click(function () {
            timerController.toggleUnit();
        });

        // Settime
        $('.timer-settime-button').click(function () {
            let data = $(this).data('timer-set');
            timerController.setTime(data);
        });

        // Settime
        $('.timer-flip-button').click(function () {
            timerController.showDetails();
        });

        // Settime
        $('.anw-timer-full-close-button').click(function () {
            timerController.hideDetails();
        });


        // TIMER NUMBER INPUT

        // Manuelle Zeiteinstellung
        $('.timer-number-full').click(function () {

            $('.timer-display').hide();
            $('.timer-display-input').show();

            $('.timer-number-input').select();

        });

        // verlassen der manuellen Zeiteinstellung

        $('.timer-number-input').focusout(
            function () {
                $('.timer-display').show();
                $('.timer-display-input').hide();
            }
        );


        // Alles selectieren
        $('.timer-number-input').click(function () {
            $(this).select();
        });

        // Wenn der Input manuell geändert wird:
        $('.timer-number-input').change(function () {
                let new_number = $(this).val();

                // die änderung in die Classe schreiben
                timerController.countFrom = new_number;

                // ins Display schreiben
                $('.timer-number').text(new_number);
            }
        )

    }

    private showDetails() {
        $('#remote-timer.flip-container').addClass('flip');
    }

    private hideDetails() {
        $('#remote-timer.flip-container').removeClass('flip');
    }


    countDown() {

        console.log('countDown');


        // 1 Minute sind 60'000 millisekunden
        let speed = 60000;

        // Sekunden ?
        if (this.unit === 'seconds') {
            speed = 1000;

        }

        let counter = 0;

        if (this.progress) {
            // mit angehaltenem CountDown fortfahren?
            counter = this.progress;
        }
        else {
            // neuen Starten
            counter = this.countFrom;
            $('.timer-number').removeClass('stage-3 stage-2 stage-1')
        }


        this.anwTimer = setInterval(countDown, speed);

        function countDown() {
            counter--;

            // Save active Progress:
            timerController.progress = counter;

            // update Number:
            console.log(counter);
            $('.timer-number').text(counter);


            // remove timer after interating through all articles

            if (counter == timerController.stage_3) {
                // bei 10 minuten -> zahl wird Gelb, 1x Gelb blinken

                $('.timer-number').addClass('stage-3');
                timerController.blink('3');

            }
            else if (counter == timerController.stage_2) {
                // bei 5 min -> zahl wird Rot, 1x Rot blinken

                $('.timer-number')
                    .removeClass('stage-3')
                    .addClass('stage-2');
                timerController.blink('2');


            }
            else if (counter === 0) {
                // bei 0: mehrfaches weisses blinken, ev. Ton

                $('.timer-number')
                    .removeClass('stage-3 stage-2')
                    .addClass('stage-1');

                timerController.blink('1');


                $('.timer-start-button').show();
                $('.timer-pause-button').hide();

                setTimeout(function () {
                    $('#remote-display-mobile-effect').addClass('stage-0');
                    $('.timer-indicator').removeClass('active');


                }, 2500);

                // Counter Stopen

                clearInterval(timerController.anwTimer);

            }


        }


    }

    /**
     *
     */
    start() {

        console.log('start');

        $('.timer-indicator').removeClass('pause');
        $('.timer-indicator').addClass('active');
        this.countDown();
        $('.timer-start-button').hide();
        $('.timer-pause-button').show();
        $('#remote-display-mobile-effect').removeClass();
    }


    /**
     *
     */
    stop() {
        console.log('stop');
        this.progress = 0;


        $('.timer-indicator').removeClass('active');
        $('.timer-indicator').removeClass('pause');
        $('.timer-indicator').css('opacity', 1.0);


        $('.timer-number').removeClass('stage-1');

        $('.timer-start-button').show();
        $('.timer-pause-button').hide();
        $('#remote-display-mobile-effect').removeClass();

    }

    /**
     *
     */
    pause() {

        $('.timer-indicator').removeClass('active');
        $('.timer-indicator').addClass('pause');
        $('.timer-indicator').css('opacity', 1.0);


        console.log('pause');
        clearInterval(timerController.anwTimer);

        $('.timer-start-button').show();
        $('.timer-pause-button').hide();
    }

    /**
     *
     * @param stage
     */
    blink(stage?: string) {
        $('#remote-display-mobile-effect').removeClass();
        $('#remote-display-mobile-effect').css('opacity', 1.0);
        $('#remote-display-mobile-effect').addClass('blink-stage-' + stage);

        setTimeout(function () {
            $('#remote-display-mobile-effect').removeClass();
            $('#remote-display-mobile-effect').css('opacity', 1.0);


        }, 2000)

    }


    /**
     *
     */
    settings() {

        console.log('settings');
        $('.timer-settings').toggle();

    }

    /**
     *
     */
    toggleUnit() {

        if (this.unit === 'seconds') {

            // auf Minute umstellen
            this.unit = 'minutes';
            $('.timer-unit').text('min');

        } else {
            // auf Sekunde umstellen

            this.unit = 'seconds';
            $('.timer-unit').text('sec');

        }


    }

    /**
     *
     */
    setTime(data?: any) {

        let minutes: number = this.countFrom;

        console.log(data);
        if (data) {
            switch (data) {

                case '+':
                    minutes++;
                    break;

                case '-':
                    minutes--;
                    break;

                default:
                    minutes = data;
                    break;

            }
        }

        // to Display
        $('.timer-number').text(minutes);
        $('.timer-number-input').val(minutes);

        return this.countFrom = minutes;

    }


}


let timerController = new TimerController();
timerController.addEventListeners();