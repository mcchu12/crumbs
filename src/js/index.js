import Swiper from 'swiper';

import $ from 'jquery';

import { gsap, Power1 } from 'gsap';

const navTl = gsap.timeline({ paused: true, duration: 0.1 });
navTl
  .set('.nav--overlay', {
    width: '100%',
  })
  .from('.nav--overlay', {
    autoAlpha: 0,
  })
  .from('.logo-name', { autoAlpha: 0 })
  .from('.nav-links a', {
    y: 20,
    autoAlpha: 0,
    stagger: 0.1,
  })
  .from('.nav--overlay button', {
    autoAlpha: 0,
    rotate: '-90deg',
  });

if (!!window.IntersectionObserver) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          gsap.to(entry.target.children, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: Power1.easeOut,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.animate').forEach((section) => {
    gsap.set(section.children, { y: 40, autoAlpha: 0 });
    observer.observe(section);
  });
}

$(document).ready(function () {
  // Menu toggle
  $('.menu-toggle').on('click', () => {
    navTl.play();
  });

  $('.nav--overlay a').on('click', () => {
    navTl.reverse();
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
