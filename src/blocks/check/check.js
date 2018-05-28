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
      },
      submitHandler: function submitHandler(form) {
        let formData = new FormData(form);
        formData.append('file', $(form).find('[name="CheckForm[file]"]').prop('files')[0]);

        $.ajax({
          url: $(form).attr('action'),
          method: 'POST',
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          data: formData,
          success: function (resp) {
            if (!$.isEmptyObject(resp)) {
              // TODO
            } else {
              window.location.reload();
            }
          }
        });
      }
    });
  });
})(jQuery);