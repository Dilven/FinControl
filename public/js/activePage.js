$(function(){
    $('a').each(function(){
        if ($(this).prop('href') == window.location.href) {
            $(this).addClass('active-page'); $(this).parents('li').addClass('active-page');
        }
    });
});