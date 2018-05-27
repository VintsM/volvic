import 'jquery-validation/dist/jquery.validate.js';

(function ($) {
  $.extend($.validator.messages, {
    required: 'Поле не заполнено',
    email: 'Email должень быть вида name@name.ru',
    pattern: 'Ошибка'
  });
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
})(jQuery);