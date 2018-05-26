(function ($) {

	function Modal (elem, options) {
		var modal = this;
		var closeButton = elem.find('.js-modal-close');
		var confirmButton = elem.find('.js-modal-confirm');
		var rejectButton = elem.find('.js-modal-reject');
		var modalWindow = elem.find('.modal__inner');

		modal.title = null;
		modal.text = null;
		modal.clicked = null;
		modal.onOpen = null;
    modal.onClose = null;
		modal.setTitle = function (title) {
		  elem.find('.modal__title').text(title);
    };
    modal.setText = function (text) {
      elem.find('.modal__text').html(text);
    };
		modal.open = function (clicked) {
			lockScreen();
			elem.addClass('open');
			if (clicked) modal.clicked = clicked;
			if (modal.onOpen != null) modal.onOpen();
      if (modal.title != null) modal.setTitle(modal.title);
      if (modal.text != null) modal.setText(modal.text);
      $('.header__burger').removeClass('active');
      $('.header__mobile-nav').hide();
		};
		modal.close = function () {
			unlockScreen();
			elem.removeClass('open');
      if (modal.onClose != null) modal.onClose();
		};
		modal.onConfirm = function () { throw Error('onConfirm() not implemented'); };
		modal.onReject = function () { };
		closeButton.on('click', function (e) {
			e.preventDefault();
			modal.close();
		});
		confirmButton.on('click', function (e) {
			e.preventDefault();
			modal.onConfirm(modal.clicked);
			modal.close();
		});
		rejectButton.on('click', function (e) {
			e.preventDefault();
			modal.onReject();
			modal.close();
		});
		modalWindow.on('click', function (e) {
			e.stopPropagation();
		});
		elem.on('click', modal.close);

		if (options) {
			for (var k in options) {
				modal[k] = options[k];
			}
		}
	}

	$.fn.modal = function (options) {
		this.each(function(index, elem) {
      var instance = new Modal($(elem), options);
      $(elem).data('modal' , instance);
		});
	};

	function getScrollbarWidth() {
		if ($(document).height() <= $(window).height()) {
			return 0;
		}

		var outer = document.createElement('div');
		var inner = document.createElement('div');
		var widthNoScroll;
		var widthWithScroll;

		outer.style.visibility = 'hidden';
		outer.style.width = '100px';
		document.body.appendChild(outer);

		widthNoScroll = outer.offsetWidth;

		// Force scrollbars
		outer.style.overflow = 'scroll';

		// Add inner div
		inner.style.width = '100%';
		outer.appendChild(inner);

		widthWithScroll = inner.offsetWidth;

		// Remove divs
		outer.parentNode.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	}

	function lockScreen() {

		var html = $('html');
		var lockedClass = 'locked';
		var paddingRight;
		var body;

		if (!html.hasClass(lockedClass)) {
			body = $(document.body);

			paddingRight = parseInt(body.css('padding-right'), 10) + getScrollbarWidth();

			body.css('padding-right', paddingRight + 'px');
			html.addClass(lockedClass);
		}
	}

	function unlockScreen() {

		var html = $('html');
		var lockedClass = 'locked';
		var paddingRight;
		var body;

		if (html.hasClass(lockedClass)) {
			body = $(document.body);

			paddingRight = parseInt(body.css('padding-right'), 10) - getScrollbarWidth();

			body.css('padding-right', paddingRight + 'px');
			html.removeClass(lockedClass);
		}
	}

  $(document).ready(function () {

    $('.modal').modal();

    var modalOpener = $('[data-modal-window]');

    modalOpener.on('click', function () {
      var modalWindow = $(this).data('modal-window');
      $(modalWindow).data('modal').open();
		});

  });
})(jQuery);
