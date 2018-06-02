import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {

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
      }
    });
  });
})(jQuery);