(function ($) {
  $(document).ready(function () {
    $('.winners__select-text').on('click', function (e) {
      e.stopPropagation();
      let select = $(this).parents('.winners__select');
      select.toggleClass('active');
    });
    $(document).on('click', function () {
      $('.winners__select').removeClass('active');
    })
  });
})(jQuery);
