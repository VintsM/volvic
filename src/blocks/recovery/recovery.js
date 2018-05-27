import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {
    $('#password-recovery-form').validate({
      submitHandler: function (form) {
        $.ajax({
          url: $(form).attr('action'),
          method: 'POST',
          data: $('#password-recovery-form').serialize(),
          success: function () {
            $('.modal-login').data('modal').close();
            $('.modal-email').data('modal').open();
          }
        });
      }
    });
    $('#password-repeat-form').validate({
      submitHandler: function (form) {
        $.ajax({
          url: $(form).attr('action'),
          data: $('#password-repeat-form').serialize(),
          method: 'POST',
          success: function () {
            $('.modal-login').data('modal').close();
            $('.modal-email').data('modal').open();
          }
        });
      }
    });
  });
})(jQuery);