define(function(require,exports,module){
	
	exports.Swiper= new Swiper('.swiper-container', {
	        paginationClickable: true,
	        spaceBetween: 30,
	        centeredSlides: true,
	        autoplay: 2500,
	        autoplayDisableOnInteraction: false
	    });
})

