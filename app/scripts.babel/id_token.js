'use strict';

$(function () {

  let $idTokenBtn = $('<button>').addClass('id-token-btn-txt').text(chrome.i18n.getMessage('idTokenBtnDefaultMessage')),
    $idTokenInput = $('<input>').attr({'type': 'text'});

  $idTokenBtn.on('click', function () {
    let name = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.LastAuthUser'),
      id_token = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.' + name + '.idToken');
    $idTokenInput.val(id_token);
    $idTokenInput.select();
    document.execCommand('copy');
    alert('copied id token');
    $idTokenInput.val('');
  });

  let $idTokenBtnDiv = $('<div>').addClass('id-token-btn')
    .append($idTokenBtn);
  $('body')
    .append($idTokenBtnDiv)
    .append($idTokenInput);
});