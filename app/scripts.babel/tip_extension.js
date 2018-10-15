'use strict'

$(function() {
  let $tipExtBtn = $('<button>')
    .addClass('btn-txt')
    .text(chrome.i18n.getMessage('tipExtBtnDefaultMessage'))

  // 投げ銭ボタンを推した時のアクション
  $tipExtBtn.on('click', async function() {
    const { value: tip } = await swal({
      title: '投げ銭するALISの量を入れてください',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      inputValidator: value => {
        let tip = Number(value)
        if (!$.isNumeric(value) || tip > 10 || tip < 0.000000000000000001) {
          return '10以下で0.000000000000000001以上の半角数値を入力ください'
        }
      }
    })

    if (tip) {
      const { value: result } = await swal({
        text: `${tip} ALISを送付します。OKですね？`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      })
      if (result) {
        let data = {
          article_id: location.href.match(/articles\/([a-zA-Z0-9]{12})/)[1],
          tip_value: Number(tip)
        }
        let response = await fetch('https://alis.to/api/me/wallet/tip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: alisEx.getIdToken()
          },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          swal({
            type: 'success',
            text: '送信に成功しました'
          })
        } else {
          console.dir(response)
          swal({
            type: 'error',
            text: '送信に失敗しました'
          })
        }
      }
    }
  })

  //カスタムチップ機能ボタンを設置。記事のサイトの時のみON
  let $tipExtDiv = $('<div>')
    .addClass('tip-btn')
    .append($tipExtBtn) //ボタンの準備
  if (alisEx.isArticlePage(location.href)) {
    $('body').append($tipExtDiv) //記事のページ判定をしボタンの設置
  }
  // web address の変化を監視しページのチェックを行う
  let href = location.href,
    observer = new MutationObserver(function(mutations) {
      let currentHref = location.href
      if (href !== currentHref) {
        if (!alisEx.isArticlePage(currentHref)) {
          $tipExtDiv.addClass('hidden');
        } else {
          $tipExtDiv.removeClass('hidden');
        }
      }
    })

  observer.observe(document, { childList: true, subtree: true })
})
