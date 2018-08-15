$( document ).ready(function() {
	$('.carousel').slick({
	  dots: false,
	  infinite: true,
	  vertical: true,
	  slidesToShow: 4,
	  slidesToScroll: 4
	});
	$('.qvvtb__carousel').slick({
	  dots: true,
	  infinite: true,
	  slidesToShow: 4,
	  slidesToScroll: 4
	});	
    $('.js-modal-open, .icon-close, .overlay-modal, .finish-btn, .keepbuy-btn').click(function(){ 
    	$('.modal').toggleClass('modal--open')
    	$('.overlay-modal').toggleClass('overlay-modal--open')
    });  
});
