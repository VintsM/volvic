import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {
    $('#check-form').validate({
      ignore: '',
      rules: {
        'CheckForm[name]': {
          cyrilliconly: true
        },
        'CheckForm[email]': {
          email: true,
          required: true
        },
        'CheckForm[file]': {
          required: true
        }
      }
    });
  });
})(jQuery);