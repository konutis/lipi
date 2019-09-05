$(document).ready(function () {
  const $siteNavToggle = $('#site-nav-toggle');
  const $siteNav = $('#site-nav');
  const $siteHeader = $('#site-header');
  const $navItems = $('.nav-item');


  /***********
   * Set hover class for header
   ***********/
  $siteHeader.hover(function() {
    $siteHeader.addClass('site-header--hovered');
  }, function() {
    $siteHeader.removeClass('site-header--hovered');
  });

  /***********
   * Navigation mobile opener script
   ***********/
  function handleCloseNav () {
    $siteNav.removeClass('site-nav--active');
    $siteNavToggle.removeClass('site-nav-toggle--active');
    $siteHeader.removeClass('site-nav--opened');
  }

  function handleToggleNav () {
    function checkOnResize () {
      let viewPort = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (viewPort > 767) {
        handleCloseNav();
        window.removeEventListener('resize', _.debounce(checkOnResize, 100));
      }
    }
    if ($siteNavToggle.hasClass('site-nav-toggle--active')) {
      window.removeEventListener('resize', _.debounce(checkOnResize, 100));
    } else {
      window.addEventListener('resize', _.debounce(checkOnResize, 100));
    }

    $siteNav.toggleClass('site-nav--active');
    $siteNavToggle.toggleClass('site-nav-toggle--active');
    $siteHeader.toggleClass('site-nav--opened');
  }

  $siteNavToggle.on('click', handleToggleNav);


  /***********
   * Loaded class add on body
   ***********/
  $(window).on('load', function () {
    window.setTimeout(function () {
      document.body.classList.add('loaded');
    }, 500);
  });


  /***********
   * Header show/hide script
   ***********/
  let prevScrollpos = window.pageYOffset;
  $(window).scroll(_.debounce(function () {
    let currentScrollPos = window.pageYOffset;
    if ($siteHeader.hasClass('site-header--hovered')) {
      prevScrollpos = currentScrollPos;
      return
    }
    if ($siteHeader.hasClass('site-nav--opened')) {
      prevScrollpos = currentScrollPos;
      return
    }

    if (prevScrollpos > currentScrollPos || currentScrollPos < $siteHeader.height()) {
      $siteHeader.removeClass('site-header--hidden');
    } else {
      $siteHeader.addClass('site-header--hidden');
    }
    prevScrollpos = currentScrollPos;
  }, 20));


  /***********
   * Animate element script
   ***********/
  let animateHTML = function () {
    let elems;
    let windowHeight;

    function init() {
      elems = document.querySelectorAll('.animate-hidden');
      windowHeight = window.innerHeight;
      addEventHandlers();
      checkPosition();
    }

    function addEventHandlers() {
      window.addEventListener('scroll', _.debounce(checkPosition, 100));
      window.addEventListener('resize', _.debounce(init, 100));
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


  /***********
   * Navigation scroll and active item set
   ***********/
  const $scrollSections = $('[data-scroll-section="true"]');

  function setActiveNavItem (activeItem) {
    let oldActiveItem = $('.nav-item--active');
    if (oldActiveItem) {
      oldActiveItem.find('.nav-item-line').remove();
      oldActiveItem.removeClass('nav-item--active');
    }

    let lineEl = document.createElement('span');
    lineEl.className = 'nav-item-line';
    activeItem.append(lineEl).addClass('nav-item--active');
  }

  function handleScroll () {
    const scrollDistance = $(window).scrollTop();
    $scrollSections.each(function(i) {
      if ($(this).position().top <= scrollDistance) {
        setActiveNavItem($navItems.eq(i));
      }
    });
  }

  $navItems.bind('click', function(e) {
    e.preventDefault();
    const $clickedItem = $(this);
    const target = $(this).attr('href');
    handleCloseNav();
    const offsetTop = $(target).offset().top;

    $('html, body').stop().animate({
      scrollTop: offsetTop === 0 ? 0 : offsetTop + 2
    }, 400, function() {
      const hash = target === '#home' ? '#' : target;
      if(history.pushState) {
        history.pushState(null, null, hash);
      } else {
        location.hash = hash;
      }

      setActiveNavItem($clickedItem);
    });

    return false;
  });

  handleScroll();
  $(window).scroll(_.debounce(handleScroll, 50));


  /***********
   * Slider
   ***********/
  $('.slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
    ]
  });

  // $(window).on('load', function () {
  //   let $thisnav = $('.nav-item--active').offset().left;
  //   $('.nav-item').hover(function () {
  //     let $left = $(this).offset().left - $thisnav;
  //     let $width = $(this).outerWidth();
  //     $('.nav-item-line').css({'left': $left, 'width': $width});
  //   }, function () {
  //     let $initwidth = $('.nav-item--active').outerWidth();
  //     $('.nav-item-line').css({'left': '0', 'width': $initwidth});
  //   });
  // });




});




