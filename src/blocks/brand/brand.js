(function ($) {
  $(document).ready(function () {
    var accum = 0;
    var data = {
      0: '#brand-item-0',
      100: '#brand-item-1',
      165: '#brand-item-2',
      230: '#brand-item-3',
      295: '#brand-item-4'
    }
    $(window).on('mousewheel', function(e) {
      if (window.STATE === 'large') {
        dropRotate(e);
      } else {
        $('.js-drop').attr('style', '');
      }
    });

    function isBetween(start,  end,  mid) {
      let end_ = (end - start + 360) % 360;
      let mid_ = (mid - start + 360) % 360;
      return (mid_ < end_);
    }

    function dropRotate(e) {
      e = e.originalEvent;
      accum += (e.deltaY || -e.wheelDelta);
      var angle = accum/100*5;
      var universalAngle = (angle%360 + 360) % 360;

      var delta = 20;
      $('.js-drop').css({transform: `rotate(${angle}deg)`});
      for (let i in data) {
        i = parseInt(i);
        if (isBetween(i-delta, i+delta, universalAngle))
          $(data[i]).addClass('on');
        else
          $(data[i]).removeClass('on');
      }
    }
  });
})(jQuery);