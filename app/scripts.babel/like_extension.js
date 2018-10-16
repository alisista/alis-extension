'use strict'

// ref: Pop all the bubbles! (Just Animate) https://codepen.io/anon/pen/LgOwJR
$(function() {
  const explosionWords = ['Oops!', 'キャッ!', 'グハッッ！！！']

  const createBubble = imageLink => {
    // create bubble graphic
    const $bubble = $('<div>')
      .css('background-image', `url("${imageLink}")`)
      .addClass('bubble')

    // wrap in a larger div so bubbles are easy to pop while moving
    const $boundingBox = document.createElement('div')
    $boundingBox.classList.add('bubble-wrap')
    $boundingBox.style.left = 5 + Math.random() * 90 + 'vw'
    $boundingBox.appendChild($bubble[0])
    $boundingBox.addEventListener('click', destroyBubble($boundingBox))

    // attach to doc and return
    document.body.appendChild($boundingBox)
    return $boundingBox
  }

  const createExplosion = (x, y) => {
    // create explosion at the coordinates
    const $explosion = document.createElement('div')
    $explosion.classList.add('explosion')
    $explosion.style.left = x + 'px'
    $explosion.style.top = y + 'px'
    $explosion.innerHTML = explosionWords[Math.floor(Math.random() * 3)]
    document.body.appendChild($explosion)

    // animate cartoon pop on words
    just
      .animate({
        targets: $explosion,
        to: 600,
        fill: 'forwards',
        easing: 'ease-out',
        css: [
          { scale: 1 },
          { offset: 0.2, scale: 1.4, opacity: 1 },
          { scale: 0.7, opacity: 0 }
        ]
      })
      .on('finish', () => document.body.removeChild($explosion))
  }

  const destroyBubble = $bubble => {
    return () => {
      // create explosion at bubbles old position
      const rect = $bubble.getBoundingClientRect()
      const centerX = (rect.right - rect.left) * 0.45 + rect.left
      const centerY = (rect.bottom - rect.top) * 0.45 + rect.top
      createExplosion(centerX, centerY)
      // remove bubble
      $bubble.style.display = 'none'
    }
  }

  const generateBubbles = (min, max, imageLink) => {
    const length = min + Math.round(Math.random() * (max - min))
    const targets = []
    for (let i = 0; i < length; i++) {
      targets.push(createBubble(imageLink))
    }
    return targets
  }

  const animateBubbles = imageLink => {
    const bubbles = generateBubbles(12, 20, imageLink)
    just
      .animate({
        targets: bubbles,
        to: '5s',
        easing: 'ease-in',
        css: {
          transform() {
            const endTranslateY = just.random(100, 110, 'vh', true)
            const startScale = just.random(80, 100, null, true)
            const endScale = just.random(40, 80, null, true)

            return [
              'translateY(0) scale(0.' + startScale + ')',
              'translatey(-' + endTranslateY + ') scale(0.' + endScale + ')'
            ]
          }
        },
        delay() {
          return just.random(0, 10000)
        }
      })
      .on('finish', () => {
        bubbles.forEach(bubble => {
          document.body.removeChild(bubble)
        })
      })
  }

  alisEx.observe(() => {
    const likeBtns = [$('div.action.like'), $('div.action.area-like')]
    likeBtns.forEach($likeBtn => {
      $likeBtn.off('click.ext')
      $likeBtn.on('click.ext', () => {
        animateBubbles($('a.area-author-info div.author img')[0].src)
      })
    })
    let $likeBtn = $('div.action-like')
    $likeBtn.off('click.ext')
    $likeBtn.on('click.ext', e => {
      let $comment = $(e.currentTarget).parent()
      animateBubbles($comment.find('img.icon')[0].src)
    })
  })
})
