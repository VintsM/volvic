(function ($) {
  function Select (elem) {
    var select = this;
    var list = elem.find('.js-select-list');
    var listItem = elem.find('.js-select-item');
    var main = elem.find('.js-select-main');
    var mainText = elem.find('.js-select-main-text');
    var placeholder = elem.find('.js-select-placeholder');

    select.open = function () {
      elem.addClass('active');
      list.show();
    };
    select.close = function () {
      list.hide();
      elem.removeClass('active');
    };
    select.reset = function () {
      mainText.text('');
      list.find('.js-select-input').attr('checked', false);
    };
    main.on('click', function () {
      select.open();
    });
    listItem.on('click', function (e) {
      e.stopPropagation();
      var text = $(this).find('.js-select-text').text();
      placeholder.addClass('select__placeholder_top');
      mainText.text(text);
      select.close();
      list.find('.js-select-input').attr('checked', false);
      $(this).find('.js-select-input').attr('checked', true);
      elem.trigger('select:select');
      list.find('.js-select-input').valid();
    });
    $(document).on('click', function (e) {
      if ($(e.target).closest(main).length == 0) select.close();
    });
  };

  $.fn.vSelect = function () {
    this.each(function(index, elem) {
      var instance = new Select($(elem));
      $(elem).data('select' , instance);
    });
  };

  $(document).ready(function () {

    $('.select').vSelect();

  });
})(jQuery);