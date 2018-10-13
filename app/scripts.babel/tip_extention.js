'use strict';

$(function () {

  // 変数宣言　
      let tipExtBtnDefaultText = chrome.i18n.getMessage('tipExtBtnDefaultMessage');
      let $tipExtBtn = $('<button>').addClass('tip-ext-btn-txt').text(tipExtBtnDefaultText);
      let $tipInputField =$('<textarea>').addClass('tip-ext-input');
      let $tipExtGo =$('<button>').addClass('tip-ext-go-txt').text("確認");
     
 
 $tipExtBtn.on('click',function(){

  let currenthref2 = location.href;
  let name = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.LastAuthUser');
  let idToken = localStorage.getItem(`CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.${name}.idToken`);
  let urlsend = "https://alis.to/api/me/wallet/tip";
  let articleN = currenthref2.slice(-12);
  var AlisValueN =0;

  // 投げ銭ALISの入力ポップアップ
  var alisValueInput = window.prompt("投げ銭するALISの量を入れてください。マイナス１８桁まで行けます。現在、1ALISまでに限定しています", "0.01");
　 
  //数値判定
   if (isNaN(alisValueInput)){
    alert('10以下の半角数値を入力ください');
    return;
   }  

   //数値化
   AlisValueN =Number(alisValueInput) ;

  if (AlisValueN > 1){
    AlisValueN = 1;
  }

  var tipConfTxt =　String(AlisValueN) + " ALISを送付します。OKですね？";

  var tipValue = AlisValueN * 1000000000000000000;

//デバック
console.log(urlsend);
console.log(articleN);
console.log(AlisValueN);
console.log(tipValue);
console.log(idToken);

  if(window.confirm(tipConfTxt)){    
    var data = {
      'article_id': articleN,
      'tip_value': String(tipValue)
    };

    var headersx = {
      'Authorization': idToken
    };

    $.ajax({
      type: 'POST',
      timeout: 3000,
      url: urlsend,
      headers: headersx,
      data: JSON.stringify(data),
      contentType: 'application/json;charset=UTF-8',
      dataType: 'json',
      
      success: function(json_data){
        if (!json_data[0]){
          alert("送信エラー " +json_data[1]);
          return;
        }
      },

      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status == "200"){
          alert("送信に成功しました");
        }
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
      },
      complete: function(){}

      });
    }

 });


// カスタムチップ機能ボタンを設置。記事のサイトの時のみON
let $tipExtDiv = $('<div>').addClass('tip-ext-btn').append($tipExtBtn); //ボタンの準備
if (isArticlePage(location.href)) { 
     $('body').append($tipExtDiv); //記事のページ判定をしボタンの設置
   }

  let href = location.href,
    observer = new MutationObserver(function (mutations) {
      let currentHref3 = location.href;
      if (href !== currentHref3) {
        if (!isArticlePage(currentHref3)) {
          $tipExtDiv.remove();
        }
      }
    });

  observer.observe(document, {childList: true, subtree: true});

});