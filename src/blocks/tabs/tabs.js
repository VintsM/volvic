(function ($) {
  $.fn.simpleTabs = function (cb) {
    this.each(function () {
      var tabs = $(this),
        tabsName = tabs.find('.js-tabs-name');

      tabsName.on('click', function () {
        var num = $(this).data('tab');
        $(this).addClass('active').parents('.js-tabs').find('.js-tabs-name').not($(this)).removeClass('active');
        tabs.find('.js-tabs-content[data-tab="' + num + '"]').addClass('active').siblings().removeClass('active');
        if (cb) {
          cb();
        }
      });
    });
  };

  $(document).ready(function () {
    $('.js-tabs').simpleTabs();
  });
})(jQuery);