$(document).ready(function() {

    fadeIn();
    
    /* handle menu show on hamburger click */
    $('.hamburger').click(function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $('.navbar-links').css({'right': '-100%', 'opacity': '0'});
            $('body').css('overflow', 'visible');
        } else {
            $(this).addClass('is-active');
            $('.navbar-links').css({'right': '0', 'opacity': '1'});
            $('body').css('overflow', 'hidden');
        }
    })

    /* hide menu when showing clicking link in hamburger menu */
    if ( $('.hamburger').css('display') === 'block' ) {
        $('.navbar-link').click(function() {
            $('.hamburger').removeClass('is-active');
            $('.navbar-links').css({'right': '-100%', 'opacity': '0'});
            $('body').css('overflow', 'visible');
        })
    }

})

/* fade animation on scroll */
$(document).on('scroll', function() {
    fadeIn();
})


/* function to open and close FAQs */
var openCloseFaq = function() {
    console.log('faq function');
    $('.faq-title').click(function() {
        if($(this).next().css('height') !== "0px") {
            $(this).next().css('height', '0px');
        } else {
            var elHeight = $(this).next().prop('scrollHeight') + 30 + 'px';
            $(this).next().css('height', elHeight);
        }
    })
}


/* function to fade in content on scroll */
var fadeIn = function () {
       
    $('.fade-in').each(function() {

        if ( ($(this).offset().top - 200 + window.innerHeight/6) < (window.innerHeight + $(document).scrollTop()) ) {

            if ($(this).hasClass('fade-in-1')) {
                $(this).css({'top': '0px', 'opacity': '1'});
            } else if ($(this).hasClass('fade-in-2')) {
                setTimeout( () => { 
                    $(this).css({'top': '0px', 'opacity': '1'});
                }, 300);
            } else if ($(this).hasClass('fade-in-3')) {
                setTimeout( () => { 
                    $(this).css({'top': '0px', 'opacity': '1'});
                }, 550);
            }
            
        }
    })

    $('.section-break').each(function() {
        if ( ($(this).offset().top) < (window.innerHeight + $(document).scrollTop()) ) {
            $(this).css('width', '100%')
        }
    })

}






