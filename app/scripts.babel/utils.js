function formatFactory(html) {
  function parse(_html, tab = 0) {
    let html = $.parseHTML(_html),
      formatHtml = String();

    function setTabs() {
      let tabs = String();

      for (let i = 0; i < tab; i++) {
        tabs += '\t';
      }
      return tabs;
    }

    $.each(html, function (i, el) {
      if (el.nodeName === '#text') {
        if (($(el).text().trim()).length) {
          formatHtml += setTabs() + $(el).text().trim() + '\n';
        }
      } else {
        let innerHTML = $(el).html().trim();
        $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));


        if ($(el).children().length) {
          $(el).html('\n' + parse(innerHTML, (tab + 1)) + setTabs());
          let outerHTML = $(el).prop('outerHTML').trim();
          formatHtml += setTabs() + outerHTML + '\n';

        } else {
          let outerHTML = $(el).prop('outerHTML').trim();
          formatHtml += setTabs() + outerHTML + '\n';
        }
      }
    });

    return formatHtml;
  }

  return parse(html.replace(/(\r\n|\n|\r)/gm, ' ').replace(/ +(?= )/g, ''));
}

function isArticleEditPage(href) {
  return href.match(/me\/articles\/new|me\/articles\/draft\/.*\/edit|me\/articles\/public\/.*\/edit/);
}

// 記事のページ判定
function isArticlePage(href) {
  var chksite = href.match(/alis.to\/.*\/articles\/[A-Za-z0-9]{12}/);

  return chksite;

}