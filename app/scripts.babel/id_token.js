'use strict'

$(function() {
  let $idTokenBtn = $('<button>')
    .addClass('btn-txt')
    .text(chrome.i18n.getMessage('idTokenBtnDefaultMessage'))

  $idTokenBtn.on('click', function() {
    let $idTokenInput = $('<input>').attr({ type: 'text' })
    $('body').append($idTokenInput)
    $idTokenInput.val(alisEx.getIdToken())
    $idTokenInput.select()
    document.execCommand('copy')
    swal({
      type: 'success',
      text: 'copied id token'
    })
    $idTokenInput.remove()
  })

  let $idTokenBtnDiv = $('<div>')
    .addClass('id-token-btn')
    .append($idTokenBtn)

  $('body').append($idTokenBtnDiv)
})
