(function ($) {

  class Upload {
    constructor (elem) {
      let upload = this;
          upload.button = elem.find('.js-upload-button');
          upload.input = elem.find('.js-upload-input');
          upload.modalMessage = $('.modal-message');
          upload.modalMessageInstance = upload.modalMessage.data('modal');
          upload.maxSize = upload.input.data('max-size') * 1000000;
          upload.ext = upload.input.data('accept');
          upload.sendButton = $('.js-upload-button-send');
          upload.file = undefined;

      upload.button.on('click', function () {
        upload.input.click();
      });

      upload.input.on('change', function () {
        let reader = new FileReader();
        upload.file = this.files[0];
        reader.onloadend = function () {
          upload.checkFile(upload.file);
        };
        reader.readAsDataURL(upload.file);
        //$(this).prop({value: ''});
      });

      upload.sendButton.on('click', function (e) {
        e.preventDefault();
        upload.modalMessageInstance.close();
        $(document).trigger('uploadStart');
      });
    }

    formatFileSize (bytes) {
      if (bytes >= 1000000) {
        bytes = (bytes / 1000000).toFixed(2) + ' MB';
      } else if (bytes >= 1000) {
        bytes = (bytes / 1000).toFixed(2) + ' KB';
      } else if (bytes > 1) {
        bytes= bytes + ' bytes';
      } else if (bytes == 1) {
        bytes=bytes + ' byte';
      } else {
        bytes = '0 byte';
      }
      return bytes;
    }

    getFileExtension (filename) {
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    checkFile (file) {
      if (file.size > this.maxSize) {
        this.modalMessage.removeClass('approve').addClass('error');
        this.modalMessageInstance.setTitle('Ошибка!');
        this.modalMessageInstance.setText('Превышен максимальный размер файла.');
        this.modalMessageInstance.open();
        this.input.val('');
        return false;
      }
      if (!~this.ext.indexOf(this.getFileExtension(file.name))) {
        this.modalMessage.removeClass('approve').addClass('error');
        this.modalMessageInstance.setTitle('Ошибка!');
        this.modalMessageInstance.setText('Недопустимый формат файла.');
        this.modalMessageInstance.open();
        this.input.val('');
        return false;
      }
      this.modalMessage.removeClass('error').addClass('approve');
      this.modalMessageInstance.setTitle('Отлично!');
      this.modalMessageInstance.setText(file.name + ' ' + this.formatFileSize(file.size));
      this.modalMessageInstance.open();
      return true;
    }
  }

  $.fn.upload = function () {
    this.each(function (index, elem) {
      let instance = new Upload($(elem));
      $(elem).data('upload', instance);
    });
  };

  $(document).ready(function () {
    $('.upload').upload();
  });
})(jQuery);