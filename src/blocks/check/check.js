import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {
    $('#check-form').validate({
      ignore: '',
      rules: {
        'CheckForm[email]': {
          email: true,
          required: true
        }
      },
      submitHandler: function submitHandler(form) {
        $.ajax({
          url: $(form).attr('action'),
          method: 'POST',
          data: $('#check-form').serialize(),
          success: function (resp) {
            if (!$.isEmptyObject(resp)) {


            } else {
              window.location.reload();
            }
          }
        });
      }
    });
  });
})(jQuery);