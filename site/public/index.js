$(document).ready(function() {

    
    $('.hamburger').click(function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $('.navbar-links').css({'right': '-100%', 'opacity': '0'});
        } else {
            $(this).addClass('is-active');
            $('.navbar-links').css({'right': '0', 'opacity': '1'});
        }
    })


})