(function() {

}());


$(document).ready(function() {
  $(window).on('load', function() {
    window.setTimeout(function() {
      document.body.classList.add('loaded');
    }, 1000);
  });
  // cool nav menu
  $(window).on('load resize', function() {
    let $thisnav = $('.nav-item--active').offset().left;
    $('.nav-item').hover(function() {
      let $left = $(this).offset().left - $thisnav;
      let $width = $(this).outerWidth();
      $('.nav-item-line').css({ 'left': $left , 'width': $width });
    }, function() {
      let $initwidth = $('.nav-item--active').outerWidth();
      $('.nav-item-line').css({ 'left': '0' , 'width': $initwidth });
    });
  });
});


let animateHTML = function() {
  let elems;
  let windowHeight;
  function init() {
    elems = document.querySelectorAll('.animate-hidden');
    windowHeight = window.innerHeight;
    addEventHandlers();
    checkPosition();
  }
  function addEventHandlers() {
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  }
  function checkPosition() {
    for (let i = 0; i < elems.length; i++) {
      let positionFromTop = elems[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        let animationClassName = elems[i].getAttribute('data-animation');
        elems[i].className = elems[i].className.replace(
          'animate-hidden',
          animationClassName
        );
      }
    }
  }
  return {
    init: init
  };
};
animateHTML().init();


$('.slider').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});