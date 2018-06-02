import 'jquery-validation/dist/jquery.validate.js';
import 'inputmask/dist/inputmask/inputmask.js';
import 'inputmask/dist/inputmask/inputmask.extensions.js';
import 'inputmask/dist/inputmask/inputmask.phone.extensions.js';
import 'inputmask/dist/inputmask/inputmask.date.extensions.js';
import 'inputmask/dist/inputmask/jquery.inputmask.js';

(function ($) {
  $.extend($.validator.messages, {
    required: 'Поле не заполнено',
    email: 'Email должен быть вида name@name.ru',
    digits: 'Только цифры'
  });

  $.validator.addMethod('cyrilliconly', function (value, element) {
    return this.optional(element) || /^[а-яёА-ЯЁ\s]+$/.test(value);
  }, 'Только кириллица');

  $.validator.addMethod('lettersDigits', function (value, element) {
    return this.optional(element) || /^[а-яёА-ЯЁ0-9\s]+$/.test(value);
  }, 'Только цифры и кириллица');

  $.validator.setDefaults({
    errorPlacement: function (error, element) {
      $(element).parents('.form-field');
      error.appendTo($(element).parents('.form-field').find('.form-field__error'));
    },
    highlight: function (element, errorClass) {
      $(element).parents('.form-field').addClass(errorClass);
      $(element).parents('.control').addClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
      $(element).parents('.form-field').removeClass(errorClass);
      $(element).parents('.control').removeClass(errorClass);
    }
  });

  // Маска на телефонные номера
  $('[data-tel="true"]').inputmask('+7 (999) 999-99-99', {showMaskOnHover: false});

  // Маска на паспорт
  $('[data-passport="true"]').inputmask('9999 999999', {showMaskOnHover: false});

  // Маска на дату
  $('[data-date="true"]').inputmask('99.99.9999', {showMaskOnHover: false});
})(jQuery);