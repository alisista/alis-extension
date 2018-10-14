'use strict';

$(function () {
　        
      let  tipBtnFlag = false,  // ボタンのオンオフの状態フラグ
           tipExtBtnDefaultText = chrome.i18n.getMessage('tipExtBtnDefaultMessage'),
           $tipExtBtn = $('<button>').addClass('tip-ext-btn-txt').text(tipExtBtnDefaultText);
     
// 投げ銭ボタンを推した時のアクション
$tipExtBtn.on('click',function(){

  let currenthref2 = location.href,
      name = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.LastAuthUser'),
      idToken = localStorage.getItem(`CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.${name}.idToken`),
      urlsend = "https://alis.to/api/me/wallet/tip",
      articleN = currenthref2.slice(-12),
      AlisValueN =0;

  //ポップアップウインドウを出して数値を聞く
  let alisValueInput = window.prompt("投げ銭するALISの量を入れてください。マイナス１８桁まで行けます。現在、1ALISまでに限定しています", "0.01");
　 
  //入力された数値判定
   if (isNaN(alisValueInput)){
    alert('10以下の半角数値を入力ください');
    return;
   }  

   //数値化
   AlisValueN =Number(alisValueInput) ;

  if (AlisValueN > 10){
    AlisValueN = 10;
  }
  if(AlisValueN == 0){
    alert('10以下　0.000000000000000001以上の半角数値を入力ください');
    return;
  }

  let tipConfTxt =　String(AlisValueN) + " ALISを送付します。OKですね？";

  let tipValue = AlisValueN * 1000000000000000000;


  if(window.confirm(tipConfTxt)){    
    
    let data = {
      'article_id': articleN,
      'tip_value': tipValue
    };

    let headersx = {
      'Authorization': idToken
    };

    $.ajax({
      type: 'POST',
      timeout: 3000,
      url: urlsend,
      headers: headersx,
      data: JSON.stringify(data),
      contentType: 'application/json;charset=UTF-8',
      dataType: 'text',})      
    
    .done(function(data) {
        alert("送信に成功しました");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    })
    .always(function() {

    })
  
  }
});


//カスタムチップ機能ボタンを設置。記事のサイトの時のみON
let $tipExtDiv = $('<div>').addClass('tip-ext-btn').append($tipExtBtn); //ボタンの準備
if (isArticlePage(location.href)) { 
     $('body').append($tipExtDiv); //記事のページ判定をしボタンの設置
     tipBtnFlag = true;
   }
// web address の変化を監視しページのチェックを行う
  let href = location.href,
    observer = new MutationObserver(function (mutations) {
      let currentHref3 = location.href;
      if (href !== currentHref3) {
        if (!isArticlePage(currentHref3)) {
          $tipExtDiv.remove();
          tipBtnFlag = false;
        }else if(isArticlePage(currentHref3) && !tipBtnFlag){
          $('body').append($tipExtDiv); 
          tipBtnFlag =true;
        }
      }
    });

  observer.observe(document, {childList: true, subtree: true});
  });

