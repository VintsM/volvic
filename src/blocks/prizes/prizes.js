(function ($) {
  $(document).ready(function () {

    var prizesSlider = '.prizes__inner',
      prizesSliderConfig = {
        infinite: false,
        slidesToShow: 1,
        arrows: false,
        dots: true
      },
      prizes = ($(prizesSlider).length > 0) ? true : false, // Нужный блок есть на странице
      bProductsInitClass = 'slick-initialized';

    function sliderInit (state) {
      if (prizes) {

        $(prizesSlider).each(function () {
          if (state === 'small' && !$(this).hasClass(bProductsInitClass)) {
            $(this).slick(prizesSliderConfig);
          } else if ($(this).hasClass(bProductsInitClass)) {
            $(this).slick('unslick');
          }
        });

      }
    }

    sliderInit(window.STATE);

    $(document).on('changeState', function (e, state) {
      sliderInit(state);
    });
  });
})(jQuery);