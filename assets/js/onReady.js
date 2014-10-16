var wrapper,elements,showElementTimer;
(function($){
	wrapper = $('#wrapper');
	elements = wrapper.children();
	
	var elementsLength = elements.length,
	showElement = function (newScreen) {
		elements.fadeOut(300, function() {
			clearTimeout(showElementTimer);
			showElementTimer = setTimeout(function() {
				$('#wrapper').scrollTop(0);
				elements.eq(newScreen - 1).fadeIn();
			}, 300);
		});
		var lastElement  = newScreen >= elementsLength ? true : false,
		firstElement  = newScreen > 1 ? false : true,
		newScreen = lastElement ?  elementsLength : newScreen;
		$('body').data('screen', newScreen);
		$('#prev').toggleClass('disabled', firstElement);
		$('#next').toggleClass('disabled', lastElement);
		$('#act').text(newScreen);
		location.hash = newScreen;
	};

	// Set the margins for all Elements
	elements.each(function () {
		var marginLeft = $(this).width() / 2;
		$(this).css('marginLeft', - marginLeft);
	});
	$('html').keydown(function (e) {
		if (e.which == 27 && $('#intro').length) {
			// ESC: Show/Hide Intro
			$('#intro').fadeToggle('slow');
		}
	});
	if ($('body').data('show-intro')) {
		$('#intro').show();
	}
	// More than one Screen
	if (elementsLength > 1) {
		// Add Navigation
		$('body').append('<div id="controls"><p><span id="act"></span> | ' + elementsLength + '</p><a href="#" id="prev" title="Previous Screen"></a><a href="#" id="next" title="Next Screen"></a></div>');
		
		$('#controls a').click(function (e) {
			e.preventDefault();
			if (!$(this).hasClass('disabled')) {
				var activeScreen = $('body').data('screen'),
				newScreen = $(this).is('#prev') ? activeScreen - 1 : activeScreen + 1;
				location.hash = newScreen;
			}
		});
		$('html').keydown(function (e) {
			if (e.which == 32) {
				// Space: Next Step
				if ($('#intro:visible').length) {
					$('#intro').fadeOut('slow');
				} else if ($('body').data('screen') == elementsLength) {
					location.hash = 1;
				} else {
					$('#next').click();
				}
			} else if (e.which == 37) {
				// Left: Prevoius Screen
				$('#prev').click();
			} else if (e.which == 38 && $('body').data('screen') > 0) {
				// Up: First Screen
				location.hash = 1;
			} else if (e.which == 39) {
				// Right: Next Screen
				$('#next').click();
			} else if (e.which == 40 && $('body').data('screen') < elementsLength) {
				// Down: Last Screen
				location.hash = elementsLength;
			} else if (e.which == 78) {
				// n: Show/Hide Navigation
				$('#controls').fadeToggle('slow');
			} else if (47 < e.which && e.which < 58) {
				// Numbers
				switch (e.which) {
					case 48:
					location.hash = 10;
					break;
					case 49:
					location.hash = 1;
					break;
					case 50:
					location.hash = 2;
					break;
					case 51:
					location.hash = 3;
					break;
					case 52:
					location.hash = 4;
					break;
					case 53:
					location.hash = 5;
					break;
					case 54:
					location.hash = 6;
					break;
					case 55:
					location.hash = 7;
					break;
					case 56:
					location.hash = 8;
					break;
					case 57:
					location.hash = 9;
					break;
				}
			}
		});
		$(window).hashchange(function () {
			var hash = parseInt(location.hash.substr(1));
			hash = hash > 1 ? hash > elementsLength ? elementsLength : hash : 1;
			showElement(hash);
		}).hashchange();
	} else {
		elements.first().fadeIn();
	}

	$(window).resize(function () {
		var width = $(window).width(),
		height = $(window).height();
		wrapper.width(width).height(height);
	}).resize();

})(jQuery);