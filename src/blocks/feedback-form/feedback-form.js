import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {

    let modal = $('.modal-message').data('modal');

    $('#feedback-form').validate({
      ignore: '',
      rules: {
        'FeedbackForm[name]': {
          cyrilliconly: true,
          required: true
        },
        'FeedbackForm[email]': {
          email: true,
          required: true
        },
        'FeedbackForm[message]': {
          required: true
        }
      },
      submitHandler: function submitHandler(form) {
        $.ajax({
          url: $(form).attr('action'),
          method: 'POST',
          data: $(form).serialize(),
          success: function (resp) {
            if (!$.isEmptyObject(resp)) {
              // TODO
            } else {
              modal.setTitle('Отлично!');
              modal.setText('Вопрос отпрвлен.');
              modal.open();
            }
          }
        });
      }
    });
  });
})(jQuery);