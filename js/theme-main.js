/*	Table OF Contents
==========================
1. Nav - Sticky
2. Nav - One Page 
3. TimeCircles Countdown
4. Magnific Popup
5. Ajax Form
6. Stellar Parallax
7. Owl Carrousel
*/

"use strict";
$(document).ready(function() {
	// $('#myModal').on('shown.bs.modal', function () {
	// 	$('#myInput').trigger('focus')
	// })

	/*==============================
		1. Nav - Sticky
	==============================*/
	$(window).on("load", function(){
	  $("#nav-sticky-wrapper").sticky({ topSpacing: 0 });
	});
	
	/*==============================
		2. Nav - One Page 
	==============================*/
	$('#nav_list').onePageNav({
		currentClass: 'active',
	});

	/*==============================
		3. TimeCircles Countdown
	==============================*/
	/*  */
	$(".countdown").TimeCircles({
		fg_width: 0.02,
		bg_width: 0.3,
		circle_bg_color: '#7b7571',
		time: {
			Days: { color: '#f9667e' },
			Hours: { color: '#f9667e' },
			Minutes: { color: '#f9667e' },
			Seconds: { color: '#f9667e' }
		},
		count_past_zero: false
	});
	$(window).on("resize", function(){
	    $(".countdown").TimeCircles().rebuild();
	});

	/*==============================
		4. Magnific Popup
	==============================*/
	$('.gallery-popup').magnificPopup({
	  delegate: 'a', // child items selector, by clicking on it popup will open
	  gallery:{enabled:true},
	  //type: 'image', //Detecta el tipo con la clase mfp-TYPE
	  mainClass: 'mfp-with-zoom', // this class is for CSS animation below

	  zoom: {
	    enabled: true, // By default it's false, so don't forget to enable it

	    duration: 300, // duration of the effect, in milliseconds
	    easing: 'ease-in-out', // CSS transition easing function

	    // The "opener" function should return the element from which popup will be zoomed in
	    // and to which popup will be scaled down
	    // By defailt it looks for an image tag:
	    opener: function(openerElement) {
	      // openerElement is the element on which popup was initialized, in this case its <a> tag
	      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
	      return openerElement.is('img') ? openerElement : openerElement.find('img');
	    }
	  },
	  markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
					  '<div class="mfp-title"></div>'+
					  '<div class="mfp-counter"></div>'+
					'</div>'+
				  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
	  titleSrc: 'title'
	  // other options
	});

	/*==============================
		5. Ajax Form
	==============================*/
	$('#ajaxFormSubmit').on('click',function(){
		var Form = $('#ajaxForm');
		var hasErrors = Form.validator('validate').has('.has-error').length
		var values = {}
		Form.serializeArray().forEach(function(input) {
			values[input.name] = input.value
		})
		var errors = [];
		
		var pescatarians = parseInt(values['number_pescatarian']);
		var vegans = parseInt(values['number_vegan']);
		var vegetarians = parseInt(values['number_vegetarian']);
		var totalWeirdFoodPeople = pescatarians + vegans + vegetarians;
		var totalGuests = parseInt(values['guests']);

		
		if (values['name'].length < 1) {
			errors.push("name too short");
			// find the input box add some red text and tell them
			
		} 
		if (values['email'].length < 1 || !values['email'].includes("@")) {
			errors.push("email not correct")
		}
		if (!values["accomodations"] && values['guests'] !== "Apologies") {			
			errors.push("select accomodations")
			$('#accomodations').addClass("red-border");			
			$('#accomodationsErrors').html("<ul class=\"list-unstyled\"><li style=\"color: #a94442\">Please select one of the above.</li></ul>");
		}
		
		if (totalGuests && totalGuests < totalWeirdFoodPeople) {			
			errors.push("please ensure that the number of vegans + pescatarians + vegetarians does not exceed the number of guests")
			$('#foodChoices').addClass("red-border");
			$('#foodErrors').html("<ul class=\"list-unstyled\"><li style=\"color: #a94442\">Number of dietary choices cannot exceed number of guests.</li></ul>");
		}
		// check that name and email are filled in
		
		// ensure that they choose one of the accomodation/food options
		// check that they don't put too many people for pescatarian/vegetarian
		
		if (errors.length > 0 || hasErrors > 0){
			
		}else{
			$('#fullscreenloading').show();
			$('#boxedResult').show();
			$('#sendResult').html('<div class="uil-rolling-css"><div><div></div><div></div></div></div>');
			$.ajax({
				type: 'POST',
				url: '/',
				data: Form.serialize(),
				success: function(msg){
					$('#sendResult').html(msg)
					$('#boxedResult').hide();
					$('#fullscreenloading').hide();
				},
				error: function(){
					$('#sendResult').html()
					$('#boxedResult').hide();
					$('#fullscreenloading').hide();
					// $('#sendResult').html('<img src="img/form-icon-error.png"/><br/><span class="title error">Sorry!</span><br/>Your data has not been sent. Please try again.<br /><strong>Error: #AJ001</strong><br /><br /><button class="btn btn-default BtnCloseResult" type="button">Close</button>');
				}
			});
			$('#accomodations').removeClass("red-border");
			$('#foodChoices').removeClass("red-border");
			$('#foodErrors').html("");
			// clear out the form

			// open modal, when modal closes thank them for their submission
			$('#exampleModal').modal()  
			// window.location.reload()
		}
	});
	
	$("#closeModal").on('click', function() {
		console.log('closed modal');
		$('#exampleModal').modal('hide')  
		window.location.reload();

	})
	
	$(document).on('click', '.BtnCloseResult', function () {
		$('#boxedResult').hide();
		$('#fullscreenloading').hide();
	});


	/*==============================
		6. Stellar Parallax
	==============================*/
	react_to_window();
        
	//only acstivate stellar for window widths above or equal to 1024
    var stellarActivated = false;
    
    $(window).on("resize", function() {
        react_to_window();
    });
    
    function react_to_window() {
        if ($(window).width() <= 1024) {
            if (stellarActivated === true) {
                $(window).data('plugin_stellar').destroy();
                stellarActivated = false;
            }
        } else {
            if (stellarActivated === false) {

                $.stellar({
                	horizontalScrolling: false,
					responsive: true,
               });
                
                $(window).data('plugin_stellar').init();
                stellarActivated = true;
            }
        }
    }

    /*==============================
		7. Owl Carrousel
	==============================*/
	$('#owl-logo').owlCarousel({
		items : 3,
		lazyLoad : true,
		navigation : false
	}); 
});