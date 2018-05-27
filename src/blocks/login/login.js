import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {
    $('#login-form').validate({
        ignore: '',
        rules: {
          'LoginForm[email]': {
                email: true,
                required: true
            },
            'LoginForm[password]': {
                required: true
            }
        },
        submitHandler: function submitHandler(form) {
          $.ajax({
            url: $(form).attr('action'),
            method: 'POST',
            data: $('#login-form').serialize(),
            success: function (resp) {
              if (!$.isEmptyObject(resp)) {
                // $(form).find('.form__common-error').text(resp.message).show();
                // $(form).parents('.modal-login').addClass('error');
              } else {
                window.location.reload();
              }
            }
          });
        }
    });

    $('.js-login-state-toggle').on('click', function (e) {
      e.preventDefault();
      var newState = $(this).data('state');
      var loginWindow = $(this).parents('.modal-login');
      var oldState = loginWindow.data('state');
      if (newState != oldState) {
        loginWindow.data('state', newState);
        loginWindow.attr('data-state', newState);
      }
    });

    if ($('.modal-login').length != 0) {
        $('.modal-login').data('modal').onClose = function () {
        $('.modal-login').data('state', 'login');
        $('.modal-login').attr('data-state', 'login');
      };
    }

  });
})(jQuery);