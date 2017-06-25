// http://tumult.com/hype/documentation/3.0/#invoking-api-from-outside-oftumult-hype
/*
 *
 *
 * Events
 *
 To help external JavaScripts integrate and interact with embedded documents
 Tumult Hype offers an event callback system, allowing external JavaScript
 functions to be triggered in response to events in embedded documents.
 One purpose for an externally invoked event would be to jump between
 scenes using controls outside of your Tumult Hype document for a slideshow.
 At this time, four event callbacks are offered, so functions can be
 registered for document loading, scene loading and unloading,
 and timeline completion:


 Events
 ------------------------------------------------------------------

 HypeDocumentLoad

 HypeSceneLoad

 HypeSceneUnload

 HypeTimelineComplete


 Transitions
 ------------------------------------------------------------------

 Instant                     kSceneTransitionInstant
 Crossfade                   kSceneTransitionCrossfade
 Swap                        kSceneTransitionSwap
 Push_Left_To_Right          kSceneTransitionPushLeftToRight
 Push_Right_To_Left          kSceneTransitionPushRightToLeft
 Push_Bottom_To_Top          kSceneTransitionPushBottomToTop
 Push_Top_To_Bottom          kSceneTransitionPushTopToBotto



 Scene Functions
 ------------------------------------------------------------------

 .sceneNames() //  Returns a list of all scenes in the document.

 .currentSceneName()    // Returns the string value for the currently shown scene.

 .showSceneNamed(sceneName, optionalTransition, optionalDuration)

 .showPreviousScene(optionalTransition, optionalDuration)

 .showNextScene(optionalTransition, optionalDuration)


 Timeline Functions#
 ------------------------------------------------------------------

 .startTimelineNamed('timelineName', direction)

 .pauseTimelineNamed('timelineName')

 .continueTimelineNamed(timelineName, direction, canRestartTimeline)

 .goToTimeInTimelineNamed(timeInSeconds, 'timelineName')


 By default, continue will not start the timeline over if it is at the end.
 To change this behavior pass true for canRestartTimeline.

 *
 *
 * */
var HypeService = (function () {
    function HypeService() {
        console.log('HypeService started');
        // Load HYPE Document
        var speed = 50;
        var trying = 20;
        var timerLoadHype = setInterval(tryList, speed);
        var counter = 0;
        function tryList() {
            counter++;
            // Nach 20 Versuchen abbrechen
            if (counter >= trying) {
                clearInterval(timerLoadHype);
            }
            // Liste
            if (window.HYPE) {
                console.log('HYPE angebunden');
                clearInterval(timerLoadHype);
                console.log(window.HYPE.documents.NICER_v5);
                hypeService.hypeDoc = window.HYPE.documents.NICER_v5;
            }
            else {
                console.log('auf HYPE warten ...');
            }
        }
    }
    /**
     *
     * Transitions:
     *
     * @param scene
     * @param transition
     */
    HypeService.prototype.goTo = function (sceneName, optionalTransition, optionalDuration) {
        var transition_name = '';
        switch (optionalTransition) {
            case 'Instant':
                transition_name = hypeService.hypeDoc.kSceneTransitionInstant;
                break;
            case 'Crossfade':
                transition_name = hypeService.hypeDoc.kSceneTransitionCrossfade;
                break;
            case 'Swap':
                transition_name = hypeService.hypeDoc.kSceneTransitionSwap;
                break;
            case 'Push_Left_To_Right':
                transition_name = hypeService.hypeDoc.kSceneTransitionPushLeftToRight;
                break;
            case 'Push_Right_To_Left':
                transition_name = hypeService.hypeDoc.kSceneTransitionPushRightToLeft;
                break;
            case 'Push_Bottom_To_Top':
                transition_name = hypeService.hypeDoc.kSceneTransitionPushBottomToTop;
                break;
            case 'Push_Top_To_Bottom':
                transition_name = hypeService.hypeDoc.kSceneTransitionPushTopToBottom;
                break;
            default:
                transition_name = hypeService.hypeDoc.kSceneTransitionInstant;
                break;
        }
        //  .playTimelineNamed('Robin');
        //  .showSceneNamed(sceneName, optionalTransition, optionalDuration)
        hypeService.hypeDoc.showSceneNamed(sceneName, hypeService.hypeDoc.kSceneTransitionPushRightToLeft, optionalDuration);
        // hypeService.hypeDoc.showSceneNamed('Profil', hypeService.hypeDoc.kSceneTransitionPushRightToLeft, 0.5);
    };
    HypeService.prototype.goToProfil = function () {
        this.goTo('Profil', 'Crossfade', 0.5);
    };
    HypeService.prototype.goToStart = function () {
        this.goTo('Kalender', 'Crossfade', 0.5);
    };
    HypeService.prototype.test = function () {
        this.goTo('test', 'Crossfade', 0.5);
    };
    HypeService.prototype.openSideMenu = function () {
        var symbolInstance = this.hypeDoc.getSymbolInstanceById('kalender_einstellungen');
        symbolInstance.startTimelineNamed('seitenmenu_oeffnen');
    };
    HypeService.prototype.start = function (timeline_name) {
        // Main Timeline
        // Hauptzeitachse
        hypeService.hypeDoc.startTimelineNamed();
    };
    HypeService.prototype.pause = function (timeline_name) {
        hypeService.hypeDoc.pauseTimelineNamed();
    };
    HypeService.prototype.continue = function (timeline_name) {
        hypeService.hypeDoc.continueTimelineNamed();
    };
    HypeService.prototype.action = function (doc) {
        //  sceneName
        //  optionalTransition
        //  optionalDuration
        if (doc) {
            console.log(doc);
            // Command
            if (doc.command) {
                hypeService[doc.command]();
            }
            // Scene
            if (doc.scene) {
                // sceneName
                if (doc.scene.sceneName) {
                    this.goTo(doc.scene.sceneName, doc.scene.optionalTransition, doc.scene.optionalDuration);
                }
            }
            // Timeline
            if (doc.timeline) {
                // sceneName
                if (doc.timeline.command) {
                    switch (doc.timeline.command) {
                        case 'start':
                            this.start(doc.timeline.timelineName);
                            break;
                        case 'pause':
                            this.pause(doc.timeline.timelineName);
                            break;
                        case 'continue':
                            this.continue(doc.timeline.timelineName);
                            break;
                        default:
                            console.log(doc.timeline.command);
                            break;
                    }
                }
            }
        }
        else {
            console.log('nichts');
        }
    };
    return HypeService;
}());
