(function ($) {
  $(document).ready(function () {
    var accum = 0;
    $(window).on('mousewheel', function(e) {
      if (window.STATE === 'large') {
        dropRotate(e);
      } else {
        $('.js-drop').attr('style', '');
      }
    });

    function dropRotate(e) {

      e = e.originalEvent;
      accum += e.deltaY;
      $('.js-drop').css({transform: `rotate(${(accum/100*5)}deg)`});
    }
  });
})(jQuery);