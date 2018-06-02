(function ($) {

  $.fn.pageStatus = function() {
    var page = {
      pageState: '',// small (< 768) || medium (>= 768,  < 1200) || large (>= 1280)
      changeState: function(init) {
        var oldPageState = this.pageState;
        if (window.innerWidth < 768) this.pageState = 'small';
        else if (window.innerWidth >= 768 && window.innerWidth < 1280) this.pageState = 'medium';
        else if (window.innerWidth >= 1280) this.pageState = 'large';
        window.STATE = this.pageState;
        if (init)
          return  $(document).trigger('changeState', [this.pageState, oldPageState]);
        return (oldPageState != this.pageState) ? $(document).trigger('changeState', [this.pageState, oldPageState]) : null;
      }
    };

    $(window).resize(function() {
      page.changeState(false);
    });

    page.changeState(true);
  };

  $(document).ready(function () {
    $('body').pageStatus();

    let s;

    if (window.STATE === 'large') {
      s = skrollr.init();
    } else {
      if (s != undefined) skrollr.destroy();
    }

    $(document).on('changeState', function () {
      if (window.STATE === 'large') {
        s = skrollr.init();
      } else {
        if (s != undefined) skrollr.destroy();
      }
    });

    $('a[href^="#"]').on('click', function (event) {
      var target = $("[id='" + this.getAttribute('href').replace('#', '') + "']");
      if (target.length) {
        event.preventDefault();
        var targetOffsetTop = target.offset().top - $('.header').outerHeight();
        $('html, body').animate({
          scrollTop: targetOffsetTop
        }, 800);
      }
    });
  });
})(jQuery);