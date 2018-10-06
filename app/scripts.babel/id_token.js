'use strict';

$(function () {

  let $idTokenBtn = $('<button>').addClass('id-token-btn-txt').text(chrome.i18n.getMessage('idTokenBtnDefaultMessage'));

  $idTokenBtn.on('click', function () {
    let name = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.LastAuthUser'),
      id_token = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.' + name + '.idToken');
    alert(id_token);
  });

  let $idTokenBtnDiv = $('<div>').addClass('id-token-btn').append($idTokenBtn);
  $('body').append($idTokenBtnDiv);
});