import Swiper from 'swiper';

import $ from 'jquery';

import { gsap } from 'gsap';

/*
  This function is from AOS library
  https://github.com/michalsnik/aos
*/
const offset = function (el) {
  let _x = 0;
  let _y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - (el.tagName != 'BODY' ? el.scrollLeft : 0);
    _y += el.offsetTop - (el.tagName != 'BODY' ? el.scrollTop : 0);
    el = el.offsetParent;
  }

  return {
    top: _y,
    left: _x,
  };
};

// Animation on scroll handler
const revealOnScroll = function () {
  const scrollTop = $(window).scrollTop();

  $('[data-animation]').each(function () {
    const $this = $(this),
      offsetTop = offset(this).top;
    const win_height = $(window).height();

    if (!$this.hasClass('animated')) {
      if (scrollTop + win_height >= offsetTop) {
        $this.addClass('animated ' + $this.data('animation'));
      }
    }
  });
};

const navTl = gsap.timeline({ paused: true, duration: 0.2 });
navTl
  .set('.overlay-nav', {
    width: '100%',
  })
  .from('.overlay-nav', {
    autoAlpha: 0,
  })
  .from('.overlay-content a', {
    y: 20,
    autoAlpha: 0,
    stagger: 0.1,
  })
  .from('.overlay-nav button', {
    autoAlpha: 0,
    rotate: '-90deg',
  });

$(document).ready(function () {
  // Add listener on scroll
  $(window).on('scroll', revealOnScroll);

  // Run scroll animation for elements in viewport once pageload
  revealOnScroll();

  // Menu toggle
  $('.menu-toggle').on('click', () => {
    navTl.play();
  });

  $('.overlay-nav a').on('click', () => {
    navTl.reverse();
  });

  // Play video
  $('.play-button').on('click', () => {
    $('.play-button').css('display', 'none');
    $('.thumbnail').css({ opacity: '0', 'z-index': '-1' });
    $('.video--with-thumbnail').css('display', 'block');
    const url = $('iframe').attr('src') + '&autoplay=1';
    $('iframe').attr('src', url);
  });

  // Smooth Scroll
  $('a[href*=\\#]').on('click', function (e) {
    // Get header height
    const headerHeight = $('#header').height();

    e.preventDefault();
    // Animate to position accounted for fixed header and extra space
    $('html, body').animate(
      {
        scrollTop: $(this.hash).offset().top - headerHeight - 30,
      },
      800
    );
  });

  // Swiper
  new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
  });
});
