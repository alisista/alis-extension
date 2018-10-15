'use strict';

$(function () {
  var $idTokenBtn = $('<button>').addClass('id-token-btn-txt').text(chrome.i18n.getMessage('idTokenBtnDefaultMessage')),
      $idTokenInput = $('<input>').attr({ type: 'text' });

  $idTokenBtn.on('click', function () {
    $idTokenInput.val(alisEx.getIdToken());
    $idTokenInput.select();
    document.execCommand('copy');
    alert('copied id token');
    $idTokenInput.val('');
  });

  var $idTokenBtnDiv = $('<div>').addClass('id-token-btn').append($idTokenBtn);

  $('body').append($idTokenBtnDiv).append($idTokenInput);
});