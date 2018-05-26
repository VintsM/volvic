(function ($) {
  $(document).ready(function () {
    $('.js-faq-question').on('click', function () {
      let question = $(this).text();
      let answer = $(this).next().html();
      let modal = $('.modal-faq').data('modal');

      modal.setTitle(question);
      modal.setText(answer);
      modal.open();
    });
  });
})(jQuery);