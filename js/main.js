jQuery(function($) {'use strict';

	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Slider
	$(document).ready(function() {
		var time = 7; // time in seconds

	 	var $progressBar,
	      $bar, 
	      $elem, 
	      isPause, 
	      tick,
	      percentTime;
	 
	    //Init the carousel
	    $("#main-slider").find('.owl-carousel').owlCarousel({
	      slideSpeed : 500,
	      paginationSpeed : 500,
	      singleItem : true,
	      navigation : true,
			navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
			],
	      afterInit : progressBar,
	      afterMove : moved,
	      startDragging : pauseOnDragging,
	      //autoHeight : true,
	      transitionStyle : "fadeUp"
	    });
	 
	    //Init progressBar where elem is $("#owl-demo")
	    function progressBar(elem){
	      $elem = elem;
	      //build progress bar elements
	      buildProgressBar();
	      //start counting
	      start();
	    }
	 
	    //create div#progressBar and div#bar then append to $(".owl-carousel")
	    function buildProgressBar(){
	      $progressBar = $("<div>",{
	        id:"progressBar"
	      });
	      $bar = $("<div>",{
	        id:"bar"
	      });
	      $progressBar.append($bar).appendTo($elem);
	    }
	 
	    function start() {
	      //reset timer
	      percentTime = 0;
	      isPause = false;
	      //run interval every 0.01 second
	      tick = setInterval(interval, 10);
	    };
	 
	    function interval() {
	      if(isPause === false){
	        percentTime += 1 / time;
	        $bar.css({
	           width: percentTime+"%"
	         });
	        //if percentTime is equal or greater than 100
	        if(percentTime >= 100){
	          //slide to next item 
	          $elem.trigger('owl.next')
	        }
	      }
	    }
	 
	    //pause while dragging 
	    function pauseOnDragging(){
	      isPause = true;
	    }
	 
	    //moved callback
	    function moved(){
	      //clear interval
	      clearTimeout(tick);
	      //start again
	      start();
	    }
	});

	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	$(document).ready(function() {
		//Animated Progress
		$('.progress-bar').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).css('width', $(this).data('width') + '%');
				$(this).unbind('inview');
			}
		});

		//Animated Number
		$.fn.animateNumbers = function(stop, commas, duration, ease) {
			return this.each(function() {
				var $this = $(this);
				var start = parseInt($this.text().replace(/,/g, ""));
				commas = (commas === undefined) ? true : commas;
				$({value: start}).animate({value: stop}, {
					duration: duration == undefined ? 1000 : duration,
					easing: ease == undefined ? "swing" : ease,
					step: function() {
						$this.text(Math.floor(this.value));
						if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
					},
					complete: function() {
						if (parseInt($this.text()) !== stop) {
							$this.text(stop);
							if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
						}
					}
				});
			});
		};

		$('.animated-number').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
			var $this = $(this);
			if (visible) {
				$this.animateNumbers($this.data('digit'), false, $this.data('duration')); 
				$this.unbind('inview');
			}
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

	//Google Map
	var latitude = $('#google-map').data('latitude');
	var longitude = $('#google-map').data('longitude');
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);

});


 function ChangeDropdowns(listName){
 var lastList = document.getElementById('lastList').value;
 if (lastList) {
	  $('#'+lastList).hide();
     //document.getElementById(lastList).style="display:none;";
 }

//value box is not nothing & object exists - change class to display
 if (listName && document.getElementById(listName)){
	  $('#'+listName).show();
 //document.getElementById(listName).style ="display:block;";
 //lastList=listName;
 document.getElementById('lastList').value=listName;
 }

}



var options1 = {
	url: "resources/pharmasource.json",

	getValue: "API NAME",

	list: {
		match: {
			enabled: true
		}
	}
};
var options = {
	url: "resources/pharmasource2.json",

	getValue: "CASNO",

	list: {
		match: {
			enabled: false
		}
	}
};
$("#cas-no").easyAutocomplete(options);
$("#api-no").easyAutocomplete(options1);

function quotes(folder){
  var pval; 
  if(folder=="cas"){
   pval = $('#cas-no').val();
  }else{
   pval = $('#api-no').val();
  }
  document.getElementById('sval').value=pval;
  
  document.getElementById('slist').innerHTML="";
  loadJSON(folder,function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
	for (var i = 0; i < actual_JSON.length; i++) {
    var object = actual_JSON[i];
	var led="";
    for (property in object) {
        var value = object[property];
		if(value==pval){
			$('#pname').html(property+" - "+value);
		  //document.getElementById('pname').innerHTML=property+" - "+value; 
          if(property.indexOf("API NAME")>-1){ 		  
		   document.getElementById('pname').innerHTML+="<br><br>Intermediates:";
		  }
         //document.getElementById('slist').innerHTML+='<li><span data-wow-duration="400ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 400ms; animation-delay: 0ms; animation-name: fadeInUp;" class="fa fa-angle-right wow fadeInUp animated animated"></span>'+property + "=" + value+'</li>';
		  led=i;
        }else if(i===led){
		  value = value.replace("~","&nbsp; - &nbsp;");
		  $('#slist').html('<ul class="about-text withArrow"><li><span data-wow-duration="400ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 400ms; animation-delay: 0ms; animation-name: fadeInUp;" class="fa fa-angle-right wow fadeInUp animated animated"></span>'+ value+'</li>');
		  //document.getElementById('slist').innerHTML+='<ul class="about-text withArrow"><li><span data-wow-duration="400ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 400ms; animation-delay: 0ms; animation-name: fadeInUp;" class="fa fa-angle-right wow fadeInUp animated animated"></span>'+ value+'</li>';
		 
		}
		
        //alert(property + "=" + value); // This alerts "id=1", "created=2010-03-19", etc..
		
    }
 }
 });
  
  
  $('#penquiry').html(pval);
  $('#enquiry').show();
 }

function loadJSON(folder,callback) {   

    var xobj = new XMLHttpRequest();
	var my_data ;
	if(folder=="cas"){
	my_data = 'resources/pharmasource2.json';
	}else{
	my_data = 'resources/pharmasource.json';
	}
        xobj.overrideMimeType("application/json");
		
        xobj.open('GET', my_data, true);
	    
		
		
	// Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 

function toggler(divId) {
if($('#morec').html().indexOf('More')>-1){
$('#morec').html("Read Less");
}else{
$('#morec').html("Read More");
}
    $("#" + divId).toggle();
}
function dtoggler(divId){
 $("#" + divId).show();
}

    //update this with your js_form selector
    var form_id_js = "javascript_form";

    var data_js = {
        //"access_token": "wacmgcc53p8b69iwxtyxgxph"
		"access_token": "thy5ywpbnx2pouf6ifz7pntm"
		
    };

    function js_onSuccess() {
        // remove this to avoid redirect
        //window.location = window.location.pathname + //"?message=Email+Successfully+Sent%21&isError=0";
		var sendButton = document.getElementById("js_send");
		sendButton.value='Sent';
		sendButton.disabled=true;
		$("#statusMsg").html("Thanks for contacting us we will reach you shortly");
		
		document.querySelector("#" + form_id_js + " [name='inputName']").value="";
        document.querySelector("#" + form_id_js + " [name='inputEmail']").value="";
        document.querySelector("#" + form_id_js + " [name='inputPhone']").value="";
        document.querySelector("#" + form_id_js + " [name='inputMessage']").value="";;
    }

    function js_onError(error) {
        // remove this to avoid redirect
        //window.location = window.location.pathname + //"?message=Email+could+not+be+sent.&isError=1";
    }

    var sendButton = document.getElementById("js_send");

    function js_send() {
        sendButton.value='Sending…';
        sendButton.disabled=true;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                js_onSuccess();
            } else
            if(request.readyState == 4) {
                js_onError(request.response);
            }
        };

        var inputName = document.querySelector("#" + form_id_js + " [name='inputName']").value;
        var inputEmail = document.querySelector("#" + form_id_js + " [name='inputEmail']").value;
		var inputPhone = document.querySelector("#" + form_id_js + " [name='inputPhone']").value;
		var inputMessage = document.querySelector("#" + form_id_js + " [name='inputMessage']").value;
        data_js['subject'] = 'Enquiry request from RushiPharma.com';
        data_js['text'] = 'Enquiry form for '+$('#sval').val()+"  Email: "+inputEmail+"  Phone: "+inputPhone+"  Message:"+inputMessage;
        var params = toParams(data_js);

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send(params);

        return false;
    }

    sendButton.onclick = js_send;

    function toParams(data_js) {
        var form_data = [];
        for ( var key in data_js ) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        return form_data.join("&");
    }

    var js_form = document.getElementById(form_id_js);
    js_form.addEventListener("submit", function (e) {
        e.preventDefault();
    });
	