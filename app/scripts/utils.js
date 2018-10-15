'use strict';

var alisEx = {

  formatFactory: function formatFactory(html) {
    var parse = function parse(_html) {
      var tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var html = $.parseHTML(_html),
          formatHtml = String();

      function setTabs() {
        var tabs = String();

        for (var i = 0; i < tab; i++) {
          tabs += '\t';
        }
        return tabs;
      }

      $.each(html, function (i, el) {
        if (el.nodeName === '#text') {
          if ($(el).text().trim().length) {
            formatHtml += setTabs() + $(el).text().trim() + '\n';
          }
        } else {
          var innerHTML = $(el).html().trim();
          $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));

          if ($(el).children().length) {
            $(el).html('\n' + parse(innerHTML, tab + 1) + setTabs());
            var outerHTML = $(el).prop('outerHTML').trim();
            formatHtml += setTabs() + outerHTML + '\n';
          } else {
            var _outerHTML = $(el).prop('outerHTML').trim();
            formatHtml += setTabs() + _outerHTML + '\n';
          }
        }
      });

      return formatHtml;
    };

    return parse(html.replace(/(\r\n|\n|\r)/gm, ' ').replace(/ +(?= )/g, ''));
  },

  isArticleEditPage: function isArticleEditPage(href) {
    return href.match(/me\/articles\/new|me\/articles\/draft\/.*\/edit|me\/articles\/public\/.*\/edit/);
  },

  // 記事のページ判定
  isArticlePage: function isArticlePage(href) {
    return href.match(/alis.to\/.*\/articles\/[a-zA-Z0-9]{12}/);
  },

  getIdToken: function getIdToken() {
    var name = localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.LastAuthUser');
    return localStorage.getItem('CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.' + name + '.idToken');
  }
};