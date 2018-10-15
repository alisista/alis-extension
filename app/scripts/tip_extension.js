'use strict';

$(function () {
  var $tipExtBtn = $('<button>').addClass('btn-txt').text(chrome.i18n.getMessage('tipExtBtnDefaultMessage'));

  // 投げ銭ボタンを推した時のアクション
  $tipExtBtn.on('click', function () {
    //ポップアップウインドウを出して数値を聞く
    var tipInput = window.prompt('投げ銭するALISの量を入れてください。マイナス１８桁まで行けます。現在、10ALISまでに限定しています', '0.01');
    //入力された数値判定
    if (!tipInput) {
      alert('10以下の半角数値を入力ください');
      return;
    }
    //数値化
    var tip = Number(tipInput);
    if (tip > 10 || tip < 0.000000000000000001) {
      alert('10以下もしくは0.000000000000000001以上の半角数値を入力ください');
      return;
    }
    if (window.confirm(tip + ' ALIS\u3092\u9001\u4ED8\u3057\u307E\u3059\u3002OK\u3067\u3059\u306D\uFF1F')) {
      var data = {
        article_id: location.href.match(/articles\/([a-zA-Z0-9]{12})/)[1],
        tip_value: tip
      };
      $.ajax({
        type: 'POST',
        timeout: 3000,
        url: 'https://alis.to/api/me/wallet/tip',
        headers: {
          Authorization: alisEx.getIdToken()
        },
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        dataType: 'text'
      }).done(function (data) {
        alert('送信に成功しました');
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('XMLHttpRequest : ' + XMLHttpRequest.status);
        console.log('textStatus     : ' + textStatus);
        console.log('errorThrown    : ' + errorThrown.message);
      });
    }
  });

  //カスタムチップ機能ボタンを設置。記事のサイトの時のみON
  var $tipExtDiv = $('<div>').addClass('tip-btn').append($tipExtBtn); //ボタンの準備
  if (alisEx.isArticlePage(location.href)) {
    $('body').append($tipExtDiv); //記事のページ判定をしボタンの設置
  }
  // web address の変化を監視しページのチェックを行う
  var href = location.href,
      observer = new MutationObserver(function (mutations) {
    var currentHref = location.href;
    if (href !== currentHref) {
      if (!alisEx.isArticlePage(currentHref)) {
        $tipExtDiv.remove();
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
});