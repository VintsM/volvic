(function ($) {
  $(document).ready(function () {
    $('.header').sticky({
      topSpacing: 0,
      responsiveWidth: true,
      zIndex: 20
    });

    $('.header__burger').on('click', function () {
      $('html').toggleClass('locked');
      $(this).toggleClass('active');
      $('.header__mobile-nav').toggle();
    });

    $('.js-login-link').on('click', function (e) {
      e.preventDefault();
      $('.modal-login').data('modal').open();
    });
  });
})(jQuery);