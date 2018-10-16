'use strict';

$(function () {
  var switchFlg = false,
      alisHtmlEditorId = 'alis-html-editor',
      htmlConvertBtnDefaultText = chrome.i18n.getMessage('htmlConvertBtnDefaultMessage'),
      $htmlConvertMenu = $('<a>').addClass('alis-extension-menu hidden').text(htmlConvertBtnDefaultText);

  $htmlConvertMenu.on('click', function () {
    var $areaBody = $('.area-body');
    if (switchFlg) {
      var $htmlTextarea = $('#' + alisHtmlEditorId);
      $areaBody.empty();
      $areaBody.append($htmlTextarea.val());
      $htmlTextarea.remove();
      $areaBody.css({
        display: ''
      });

      $htmlConvertMenu.text(htmlConvertBtnDefaultText);
    } else {
      $areaBody.find('.medium-insert-buttons').remove();
      $areaBody.find('.medium-insert-active').remove();

      $areaBody.css({ display: 'none' });

      var _$htmlTextarea = $('<textarea>').attr({
        id: alisHtmlEditorId,
        rows: 500
      }).val(alisEx.formatFactory($areaBody.html()));
      $areaBody.after(_$htmlTextarea);

      $htmlConvertMenu.text(chrome.i18n.getMessage('htmlConvertBtnReturnMessage'));
    }
    switchFlg = !switchFlg;
  });
  $('#alis-extension').append($htmlConvertMenu);
  alisEx.observeMenu(alisEx.isArticleEditPage, $htmlConvertMenu);
});