import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {

    let modal = $('.modal-message').data('modal');

    $('#lk-form').validate({
      ignore: '',
      rules: {
        'LKForm[name]': {
          cyrilliconly: true,
          required: true
        },
        'LKForm[email]': {
          email: true,
          required: true
        },
        'LKForm[file]': {
          required: true
        },
        'LKForm[region]': {
          cyrilliconly: true,
          required: true
        },
        'LKForm[city]': {
          cyrilliconly: true,
          required: true
        },
        'LKForm[street]': {
          cyrilliconly: true,
          required: true
        },
        'LKForm[house]': {
          digits: true,
          required: true
        },
        'LKForm[building]': {
          lettersDigits: true
        },
        'LKForm[construction]': {
          lettersDigits: true
        },
        'LKForm[apartment]': {
          lettersDigits: true
        },
        'LKForm[postcode]': {
          digits: true,
          required: true
        }
      },
      submitHandler: function submitHandler(form) {
        let formData = new FormData(form);
        let fileInput = $(form).find('[name="LKForm[file]"]');
        if (fileInput.length !== 0) {
          formData.append('file', fileInput.prop('files')[0]);
        }

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
              modal.setTitle('Отлично!');
              modal.setText('Данные сохранены.');
              modal.open();
            }
          }
        });
      }
    });
  });
})(jQuery);