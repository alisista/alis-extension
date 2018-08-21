'use strict';

$(function () {

  function formatFactory(html) {
    function parse(_html, tab = 0) {
      let html = $.parseHTML(_html),
        formatHtml = String();

      function setTabs() {
        let tabs = String();

        for (let i = 0; i < tab; i++) {
          tabs += '\t';
        }
        return tabs;
      }

      $.each(html, function (i, el) {
        if (el.nodeName === '#text') {
          if (($(el).text().trim()).length) {
            formatHtml += setTabs() + $(el).text().trim() + '\n';
          }
        } else {
          let innerHTML = $(el).html().trim();
          $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));


          if ($(el).children().length) {
            $(el).html('\n' + parse(innerHTML, (tab + 1)) + setTabs());
            let outerHTML = $(el).prop('outerHTML').trim();
            formatHtml += setTabs() + outerHTML + '\n';

          } else {
            let outerHTML = $(el).prop('outerHTML').trim();
            formatHtml += setTabs() + outerHTML + '\n';
          }
        }
      });

      return formatHtml;
    }

    return parse(html.replace(/(\r\n|\n|\r)/gm, ' ').replace(/ +(?= )/g, ''));
  }

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
      }).val(formatFactory($areaBody.html()));
      $areaBody.after($htmlTextarea).css({display: 'none'});
      $htmlConvertBtn.text(chrome.i18n.getMessage('htmlConvertBtnReturnMessage'));
    }
    switchFlg = !switchFlg;
  });

  let $htmlConvertDiv = $('<div>').addClass('html-convert-btn').append($htmlConvertBtn);
  $('body').append($htmlConvertDiv);
});