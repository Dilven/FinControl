window.onload = function() {
    $('.site-content').hide();
    $('.preloader').delay(1000).fadeOut();
    $('.load').delay(1050).fadeOut('slow'); 
    $('.site-content').delay(1050).fadeIn('slow');
}

