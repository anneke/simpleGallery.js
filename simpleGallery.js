/*!
 * pure javascript simpleGallery.js v1.0.0
 * https://github.com/asinnema/simpleGallery.js
 *
 * Copyright 2016, Anneke Sinnema
 * Released under the MIT license
 */

 function simpleGallery(liClassName) {

	var steps = document.querySelectorAll(liClassName);
	var totalSteps = steps.length;
	var currentStep = 0;
	var lastStep = steps.length - 1; 

	/** adds a little status bar with the current step **/
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
		 else if (currentStep == 0) {
				 setVisibility(triggerFirst, false);
				 setVisibility(triggerPrevious, false);
		 }
	}

	function goToNext() {
		 if (currentStep < lastStep) {
				 steps[currentStep].className = 'process__step';
				 currentStep = (currentStep+1);
				 steps[currentStep].className = 'process__step process__step--active';
				 showCurrentStep();
		 }

		 if (currentStep > 0) {
				 setVisibility(triggerFirst, true);
				 setVisibility(triggerPrevious, true);
		 }

		 if (currentStep == lastStep) {
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
	 console.log('click registered: triggerfirst');
		 goToFirst();
		 event.preventDefault();
	});

	triggerNext.addEventListener('click', function() {
	 console.log('click registered: next');
		 goToNext();
		 event.preventDefault();
	});

	triggerPrevious.addEventListener('click', function() {
	 console.log('click registered: previous');
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
}

/** TL:DR; enter the tag containing text within quotation marks,
add a comma and indicate after how many words you want to insert the break.

For example:

<script>
simpleGallery('.process__step');
</script>

**/
