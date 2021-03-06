(function ($) {
  $(document).ready(function () {
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 0) {
        $('.header').addClass('active');
      } else {
        $('.header').removeClass('active');
      }
    });

    $('.header__mobile-link').on('click', function () {
      $('.header__burger').removeClass('active');
      $('.header__mobile-nav').hide();
    });

    $('.header__burger').on('click', function () {
      $(this).toggleClass('active');
      $('.header__mobile-nav').toggle();
    });

    $('.js-login-link').on('click', function (e) {
      e.preventDefault();
      $('.modal-login').data('modal').open();
    });
  });
})(jQuery);