'use strict';

// ref: Pop all the bubbles! (Just Animate) https://codepen.io/anon/pen/LgOwJR

$(function () {
  var explosionWords = ['Oops!', 'キャッ!', 'グハッッ！！！'];

  var createBubble = function createBubble(imageLink) {
    // create bubble graphic
    var $bubble = $('<div>').css('background-image', 'url("' + imageLink + '")').addClass('bubble');

    // wrap in a larger div so bubbles are easy to pop while moving
    var $boundingBox = document.createElement('div');
    $boundingBox.classList.add('bubble-wrap');
    $boundingBox.style.left = 5 + Math.random() * 90 + 'vw';
    $boundingBox.appendChild($bubble[0]);
    $boundingBox.addEventListener('click', destroyBubble($boundingBox));

    // attach to doc and return
    document.body.appendChild($boundingBox);
    return $boundingBox;
  };

  var createExplosion = function createExplosion(x, y) {
    // create explosion at the coordinates
    var $explosion = document.createElement('div');
    $explosion.classList.add('explosion');
    $explosion.style.left = x + 'px';
    $explosion.style.top = y + 'px';
    $explosion.innerHTML = explosionWords[Math.floor(Math.random() * 3)];
    document.body.appendChild($explosion);

    // animate cartoon pop on words
    just.animate({
      targets: $explosion,
      to: 600,
      fill: 'forwards',
      easing: 'ease-out',
      css: [{ scale: 1 }, { offset: 0.2, scale: 1.4, opacity: 1 }, { scale: 0.7, opacity: 0 }]
    }).on('finish', function () {
      return document.body.removeChild($explosion);
    });
  };

  var destroyBubble = function destroyBubble($bubble) {
    return function () {
      // create explosion at bubbles old position
      var rect = $bubble.getBoundingClientRect();
      var centerX = (rect.right - rect.left) * 0.45 + rect.left;
      var centerY = (rect.bottom - rect.top) * 0.45 + rect.top;
      createExplosion(centerX, centerY);
      // remove bubble
      $bubble.style.display = 'none';
    };
  };

  var generateBubbles = function generateBubbles(min, max, imageLink) {
    var length = min + Math.round(Math.random() * (max - min));
    var targets = [];
    for (var i = 0; i < length; i++) {
      targets.push(createBubble(imageLink));
    }
    return targets;
  };

  var animateBubbles = function animateBubbles(imageLink) {
    var bubbles = generateBubbles(12, 20, imageLink);
    just.animate({
      targets: bubbles,
      to: '5s',
      easing: 'ease-in',
      css: {
        transform: function transform() {
          var endTranslateY = just.random(100, 110, 'vh', true);
          var startScale = just.random(80, 100, null, true);
          var endScale = just.random(40, 80, null, true);

          return ['translateY(0) scale(0.' + startScale + ')', 'translatey(-' + endTranslateY + ') scale(0.' + endScale + ')'];
        }
      },
      delay: function delay() {
        return just.random(0, 10000);
      }
    }).on('finish', function () {
      bubbles.forEach(function (bubble) {
        document.body.removeChild(bubble);
      });
    });
  };

  alisEx.observe(function () {
    var likeBtns = [$('div.action.like'), $('div.action.area-like')];
    likeBtns.forEach(function ($likeBtn) {
      $likeBtn.off('click.ext');
      $likeBtn.on('click.ext', function () {
        animateBubbles($('a.area-author-info div.author img')[0].src);
      });
    });
    var $likeBtn = $('div.action-like');
    $likeBtn.off('click.ext');
    $likeBtn.on('click.ext', function (e) {
      var $comment = $(e.currentTarget).parent();
      animateBubbles($comment.find('img.icon')[0].src);
    });
  });
});