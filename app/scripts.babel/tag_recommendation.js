'use strict'

$(() => {

  if (alisEx.isArticleEditPage && $('.popup').length){
    $('.tags-input-form').after('<div class="tag-recommendation"><a class="tag-btn"></a></div>');
    $('.tag-btn').text(chrome.i18n.getMessage('ALISTagRecomBtnDefaultMessage'));
    var articleType = 'crypto'
  }

  $('.article-type-select').change(() => {
    articleType = $('.article-type-select').val();
  })

  $('.tag-btn').on('click', async function() {
    // console.log(articleType);
    let data = {
      article_id: location.href.match(/articles\/draft\/([a-zA-Z0-9]{12})/)[1]
    }
    let api_url = `https://alis.to/api/me/articles/${data.article_id}/drafts`;
    // console.log(api_url);
    await fetch(api_url, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         Authorization: alisEx.getIdToken()
       }
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
    }).catch( function ( error ) {
      console.dir(response)
        swal({
          type: 'error',
          text: '失敗しました'
        })
    });
  });
})
