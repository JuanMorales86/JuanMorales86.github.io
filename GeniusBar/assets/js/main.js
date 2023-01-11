$(document).ready(function(){
	var altura = $('.menu').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura ){
			$('.menu').addClass('menu__fixed');
		} else {
			$('.menu').removeClass('menu__fixed');
		}
	});

});