import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })

  document.onmousemove = e => {
    if (type ==='col') {
      preColumnResize(e)
    } else {
      preRowResize(e)
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      makeColumnResize()
    } else {
      makeRowResize()
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }

  function preRowResize(e) {
    const delta = Math.floor(e.pageY - coords.bottom)
    value = coords.height + delta
    $resizer.css({bottom: -delta + 'px'})
  }

  function preColumnResize(e) {
    const delta = Math.floor(e.pageX - coords.right)
    value = coords.width + delta
    $resizer.css({right: -delta + 'px'})
  }

  function makeColumnResize() {
    $parent.css({width: value + 'px'})
    $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px')
  }

  function makeRowResize() {
    $parent.css({height: value + 'px'})
  }
}
