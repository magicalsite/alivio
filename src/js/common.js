var $WINDOW = $(window),
    $HTML = $('html'),
    $BODY = $('body');

/**
 * !Detects overlay scrollbars (when scrollbars on overflowed blocks are visible).
 * This is found most commonly on mobile and OS X.
 * */
var HIDDEN_SCROLL = Modernizr.hiddenscroll;
var NO_HIDDEN_SCROLL = !HIDDEN_SCROLL;
var TOUCHEVENTS = ("ontouchstart" in document.documentElement);

/**
 * Mobile detect
 */
var md = new MobileDetect(window.navigator.userAgent);
var DEVICE = !!md.mobile() || !!md.tablet();
if (DEVICE) {
  $HTML.addClass('mobile-device');
}


/**
 * !Add touchscreen classes
 * */
function addTouchClasses() {
  if (TOUCHEVENTS) {
    document.documentElement.className += " touchevents";
  } else {
    document.documentElement.className += " no-touchevents";
  }
}

/**
 * !Add placeholder for old browsers
 * */
function placeholderInit() {
  $('[placeholder]').placeholder();
}

/**
 * !Add classes to form elements
 * if they has a value or they are in focus
 * */

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect() {
  var $select = $('select.cselect');

  if ($select.length) {
    $.each($select, function () {
      var $thisSelect = $(this);
      $thisSelect.select2({
        theme: 'custom',
        language: 'ru',
        width: '100%',
        containerCssClass: 'cselect-head',
        dropdownCssClass: 'cselect-drop'
      });
    })
  }
}

/**
 * !Main navigation
 */
function mainNavigation() {
  var $nav = $('.nav-js');
  if ($nav.length) {

    $nav.nav({
      submenuPosition: false,
    });
  }
}

$('.nav-opener-js').on('click', function (e) {
  var $curBtn = $(this);

  $curBtn.add($($curBtn.attr('href'))).addClass('is-open');

  $HTML.addClass('css-scroll-fixed open-only-mob');

  e.preventDefault();
});

function hideNav() {
  $('.is-open').removeClass('is-open');
  $HTML.removeClass('css-scroll-fixed open-only-mob');
}

$('.nav-close-btn-js').on('click', function (e) {
  hideNav();

  e.preventDefault();
});

$('.nav-overlay').on('click', function () {
  hideNav();
});

$HTML.keyup(function (event) {
  if (event.keyCode === 27) {
    hideNav();
  }
});

/**
 * !Main menu toggle active class
 */
function toggleActiveMenuItem() {
  var $menu = $('.js-menu');
  var $menuItem = $('.js-menu-item');
  var $wordBg = $('.js-word-bg');
  var activeClass = 'm-active';

  if ($menu.length) {
    if (!$menu.has('.' + activeClass).length) {
      $menuItem.eq(0).addClass(activeClass);
    }

    $menu.on('mouseenter touchend', '.js-menu-anchor', function (e) {
      // if (window.innerWidth < 992) return;

      var $curAnchor = $(this);
      var $curItem = $curAnchor.closest($menuItem);

      if (e.handleObj.origType === 'touchend') {
        if (!$curItem.hasClass(activeClass)) {
          e.preventDefault();
        }
      }

      if ($curItem.hasClass(activeClass)) return;

      var $allItems = $curAnchor.closest($menu).find($menuItem);
      var index = $curItem.index();
      var $curWordBg = $wordBg.eq(index);

      $allItems.add($wordBg).removeClass(activeClass);
      $curItem.add($curWordBg).addClass(activeClass);
    });
  }
}

// Video play button
$('.story__button').on('click', function (e) {
  let video = $('.story__video');
  if (video.get(0).paused === true) {
    video.get(0).volume = 0.3;
    video.get(0).play();
    $('.story__button').css('display', 'none');
  }
  return false;
});

$('.story__video').on('click', function (e) {
  let video = $('.story__video');
  if (video.get(0).paused === false) {
      video.get(0).pause();
      $('.story__button').css('display', 'block');
  }
  return false;
}); 

// Step Slider
var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// WOW + animate
new WOW().init();

$WINDOW.on('load', function () {
  $HTML.addClass('page-loaded');
  $('.js-p-preloader').addClass('p-preloader_hide');
});

$(document).ready(function () {
  // Base
  addTouchClasses();
  placeholderInit();
  customSelect();
  objectFitImages(); // object-fit-images initial
  // Common
  mainNavigation();
  toggleActiveMenuItem();
});