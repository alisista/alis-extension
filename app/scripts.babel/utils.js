const alisEx = {

  formatFactory: (html) => {
    const parse = (_html, tab = 0) => {
      let html = $.parseHTML(_html),
        formatHtml = String()

      function setTabs() {
        let tabs = String()

        for (let i = 0; i < tab; i++) {
          tabs += '\t'
        }
        return tabs
      }

      $.each(html, (i, el) => {
        if (el.nodeName === '#text') {
          if (
            $(el)
              .text()
              .trim().length
          ) {
            formatHtml +=
              setTabs() +
              $(el)
                .text()
                .trim() +
              '\n'
          }
        } else {
          let innerHTML = $(el)
            .html()
            .trim()
          $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''))

          if ($(el).children().length) {
            $(el).html('\n' + parse(innerHTML, tab + 1) + setTabs())
            let outerHTML = $(el)
              .prop('outerHTML')
              .trim()
            formatHtml += setTabs() + outerHTML + '\n'
          } else {
            let outerHTML = $(el)
              .prop('outerHTML')
              .trim()
            formatHtml += setTabs() + outerHTML + '\n'
          }
        }
      })

      return formatHtml
    }

    return parse(html.replace(/(\r\n|\n|\r)/gm, ' ').replace(/ +(?= )/g, ''))
  },

  isArticleEditPage: (href) => {
    return href.match(
      /me\/articles\/new|me\/articles\/draft\/.*\/edit|me\/articles\/public\/.*\/edit/
    )
  },

  // 記事のページ判定
  isArticlePage: (href) => {
    return href.match(/alis.to\/.*\/articles\/[a-zA-Z0-9]{12}/)
  },

  getIdToken: () => {
    let name = localStorage.getItem(
      'CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.LastAuthUser'
    )
    return localStorage.getItem(
      `CognitoIdentityServiceProvider.2gri5iuukve302i4ghclh6p5rg.${name}.idToken`
    )
  }
}
