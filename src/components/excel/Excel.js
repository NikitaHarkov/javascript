import {$} from '@/core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRood() {
    const $root = $.create('div', 'excel')
    // const $root = document.createElement('div')
    // $root.classList.add('excel')

    this.components = this.components.map(Component => {
      // const $el = document.createElement('div')
      // $el.classList.add(Component.className)
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // DEBUGG
      // if (component.name) {
      //  window['c' + component.name] = component
      // }
      $el.html(component.toHtml())
      $root.append($el)
      return component
    });
    return $root
  }

  render() {
    this.$el.append(this.getRood())

    this.components.forEach(component => component.init());
  }
}
