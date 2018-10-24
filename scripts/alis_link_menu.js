'use strict';

$(function () {
  var $ALISlinkExtMenu1 = $('<a>').addClass('alis-extension-alis-link-menu').html('<a href="https://alis.to/articles/popular">' + chrome.i18n.getMessage('ALISlinkExtBtnDefaultMessage1') + '</a>');
  var $ALISlinkExtMenu2 = $('<a>').addClass('alis-extension-alis-link-menu').html('<a href="https://alis.to/articles/recent">' + chrome.i18n.getMessage('ALISlinkExtBtnDefaultMessage2') + '</a>');

  $('#alis-extension-alis-link').append($ALISlinkExtMenu1);
  $('#alis-extension-alis-link').append($ALISlinkExtMenu2);
});