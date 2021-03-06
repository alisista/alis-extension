'use strict'

$(() => {
  let $idTokenMenu = $('<a>')
    .addClass('alis-extension-menu')
    .text(chrome.i18n.getMessage('idTokenBtnDefaultMessage'))

  $idTokenMenu.on('click', () => {
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

  $('#alis-extension').append($idTokenMenu)
})
