/*!
 * pure javascript simpleGallery.js v1.0.0
 * https://github.com/asinnema/simpleGallery.js
 *
 * Copyright 2016, Anneke Sinnema
 * Released under the MIT license
 */

var steps = document.querySelectorAll('.process__step');
var totalSteps = steps.length;
var currentStep = 0;

showCurrentStep();

function showCurrentStep() {
		var statusSpan = document.getElementById('js-stepStatus');

		var statusText = "Stap " + (currentStep+1) + " van " + totalSteps;
		statusSpan.innerHTML = statusText;
}

function goToFirst() {
		steps[currentStep].className = 'process__step';
		currentStep = 0;
		steps[currentStep].className = 'process__step process__step--active';

		setVisibility(triggerPrevious, false);
		setVisibility(triggerFirst, false);
		showCurrentStep();
}

function goToPrevious() {
    if (currentStep > 0) {
        steps[currentStep].className = 'process__step';
        currentStep = (currentStep-1);
        steps[currentStep].className = 'process__step process__step--active';
				setVisibility(triggerNext, true);
        showCurrentStep();
    }
		if (currentStep == 0) {
				/** if this step is the first one **/
				setVisibility(triggerFirst, false);
				setVisibility(triggerPrevious, false);
		}
}

function goToNext() {
		if (currentStep < totalSteps) {
				/** if this step is not the last one, go to the next step **/
				steps[currentStep].className = 'process__step';
				currentStep = (currentStep+1);
				steps[currentStep].className = 'process__step process__step--active';
				showCurrentStep();
		}

		if (currentStep > 0) {
				/** if this step is not the first one, show the button to previous step **/
				setVisibility(triggerFirst, true);
				setVisibility(triggerPrevious, true);
		}

		if (currentStep == 2) {
				/** if this step is the last one **/
				setVisibility(triggerNext, false);
		}
}

function setVisibility(trigger, doSetVisible) {
	  trigger.className = doSetVisible ? 'is-visible' : 'is-hidden';
	  trigger.setAttribute("aria-hidden", !doSetVisible);
}

var triggerFirst = document.getElementById('js-first');
var triggerPrevious = document.getElementById('js-previous');
var triggerNext = document.getElementById('js-next');

triggerFirst.addEventListener('click', function() {
		goToFirst();
	  event.preventDefault();
});

triggerNext.addEventListener('click', function() {
		goToNext();
    event.preventDefault();
});

triggerPrevious.addEventListener('click', function() {
		goToPrevious();
		event.preventDefault();
});

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        goToPrevious();
    }
    else if (e.keyCode == '39') {
				goToNext();
    }
}
