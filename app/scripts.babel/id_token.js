'use strict'

$(function() {
  let $idTokenBtn = $('<button>')
      .addClass('btn-txt')
      .text(chrome.i18n.getMessage('idTokenBtnDefaultMessage')),
    $idTokenInput = $('<input>').attr({ type: 'text' })

  $idTokenBtn.on('click', function() {
    $idTokenInput.val(alisEx.getIdToken())
    $idTokenInput.select()
    document.execCommand('copy')
    alert('copied id token')
    $idTokenInput.val('')
  })

  let $idTokenBtnDiv = $('<div>')
    .addClass('id-token-btn')
    .append($idTokenBtn)

  $('body')
    .append($idTokenBtnDiv)
    .append($idTokenInput)
})
