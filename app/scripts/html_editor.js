'use strict';

$(function () {
  var switchFlg = false,
      alisHtmlEditorId = 'alis-html-editor',
      htmlConvertBtnDefaultText = chrome.i18n.getMessage('htmlConvertBtnDefaultMessage'),
      $htmlConvertBtn = $('<button>').addClass('html-convert-btn-txt').text(htmlConvertBtnDefaultText);

  $htmlConvertBtn.on('click', function () {
    var $areaBody = $('.area-body');
    if (switchFlg) {
      var $htmlTextarea = $('#' + alisHtmlEditorId);
      $areaBody.empty();
      $areaBody.append($htmlTextarea.val());
      $htmlTextarea.remove();
      $areaBody.css({ display: '' });

      $htmlConvertBtn.text(htmlConvertBtnDefaultText);
    } else {
      $areaBody.find('.medium-insert-buttons').remove();
      $areaBody.find('.medium-insert-active').remove();

      $areaBody.css({ display: 'none' });

      var _$htmlTextarea = $('<textarea>').attr({
        id: alisHtmlEditorId,
        rows: 500
      }).val(alisEx.formatFactory($areaBody.html()));
      $areaBody.after(_$htmlTextarea);

      $htmlConvertBtn.text(chrome.i18n.getMessage('htmlConvertBtnReturnMessage'));
    }
    switchFlg = !switchFlg;
  });
  var $htmlConvertDiv = $('<div>').addClass('html-convert-btn').append($htmlConvertBtn);
  if (alisEx.isArticleEditPage(location.href)) {
    $('body').append($htmlConvertDiv);
  }
  var href = location.href,
      observer = new MutationObserver(function (mutations) {
    var currentHref = location.href;
    if (href !== currentHref) {
      if (!alisEx.isArticleEditPage(currentHref)) {
        $htmlConvertDiv.remove();
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
});