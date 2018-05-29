
(function ($) {
  $(document).ready(function () {
    document.addEventListener('change', function(event) {
      let element = event.target;
      if (element && element.matches('.input__field')) {
        element.classList[element.value ? 'add' : 'remove']('has-value');
      }
    });
  });
})(jQuery);