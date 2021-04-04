$(document).ready(function() {
    
    fadeIn();

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


$(document).on('scroll', function() {
    fadeIn();
})
 

var fadeIn = function () {
       
    $('.fade-in').each(function() {

        if ( ($(this).offset().top - 250 + $(window).height()/6) < ($(window).height() + $(document).scrollTop()) ) {

            if ($(this).hasClass('fade-in-1')) {
                $(this).css({'top': '0px', 'opacity': '1'});
            } else if ($(this).hasClass('fade-in-2')) {
                setTimeout( () => { 
                    $(this).css({'top': '0px', 'opacity': '1'});
                }, 200);
            } else if ($(this).hasClass('fade-in-3')) {
                setTimeout( () => { 
                    $(this).css({'top': '0px', 'opacity': '1'});
                }, 500);
            }
            
        }
        
    })
}