'use strict'

$(() => {
  let $linkExtMenu = $('<a>')
    .addClass('alis-extension-link-menu')
    //.text(chrome.i18n.getMessage('linkExtBtnDefaultMessage'))
    .html('<a href="https://github.com/alisista/alis-extension/wiki">'+ chrome.i18n.getMessage('linkExtBtnDefaultMessage') + '"</a>');

  $('#alis-extension-link').append($linkExtMenu)
})
