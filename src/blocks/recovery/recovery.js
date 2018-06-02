import 'jquery-validation/dist/jquery.validate.js';
import 'jquery-validation/dist/additional-methods.js';

(function ($) {
  $(document).ready(function () {
    $('#password-recovery-form').validate();
    $('#password-repeat-form').validate();
  });
})(jQuery);