// src/custom.js
import $ from 'jquery';
import GLightbox from 'glightbox';
import 'waypoints/lib/noframework.waypoints.min';
import AOS from 'aos';
import feather from 'feather-icons';
import counterUp from 'counterup2';

$(document).ready(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // Initialize Feather Icons
  feather.replace();

  // 5. counter
  $(window).on('load', function() {
    $('.counter').each(function() {
      const waypoint = new Waypoint({
        element: this,
        handler: function() {
          counterUp(this, {
            duration: 1000,
            delay: 16
          });
          this.destroy();
        },
        offset: 'bottom-in-view'
      });
    });
  });

  // Elements from the other template

  // Initiate  glightbox 
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // Skills animation
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  // Animation on scroll
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
});
