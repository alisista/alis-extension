'use strict';

$(function () {

  let switchFlg = false,
    alisHtmlEditorId = 'alis-html-editor',
    htmlConvertBtnDefaultText = chrome.i18n.getMessage('htmlConvertBtnDefaultMessage'),
    $htmlConvertBtn = $('<button>').addClass('html-convert-btn-txt').text(htmlConvertBtnDefaultText);

  $htmlConvertBtn.on('click', function () {
    let $areaBody = $('.area-body');
    if (switchFlg) {
      let $htmlTextarea = $(`#${alisHtmlEditorId}`);
      $areaBody.empty();
      $areaBody.append($htmlTextarea.val());
      $htmlTextarea.remove();
      $areaBody.css({display: ''});
      $htmlConvertBtn.text(htmlConvertBtnDefaultText);
    } else {
      let $htmlTextarea = $('<textarea>').attr({
        id: alisHtmlEditorId,
        rows: 500
      }).val($areaBody.html());
      $areaBody.after($htmlTextarea).css({display: 'none'});
      $htmlConvertBtn.text(chrome.i18n.getMessage('htmlConvertBtnReturnMessage'));
    }
    switchFlg = !switchFlg;
  });

  let $htmlConvertDiv = $('<div>').addClass('html-convert-btn').append($htmlConvertBtn);
  $('body').append($htmlConvertDiv);
});