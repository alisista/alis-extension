'use strict'

$(() => {
  $('body').append(
    $('<div>')
      .attr({ id: 'alis-extension' })
      .addClass('alis-extension-list')
  )
  $('body').append(
    $('<div>')
      .attr({ id: 'alis-extension-link' })
      .addClass('alis-extension-link-list')
  )
})
