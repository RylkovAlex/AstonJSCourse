export default class AbstractComponent {
  _isInitialized = false;
  _rootElement = null;
  _tagName = 'div';
  _element = null;
  _html = '';

  constructor(rootElement) {
    this._rootElement = rootElement;
  }

  getHTML() {
    return this._html;
  }

  init() {
    this._isInitialized = true;
  }

  render() {
    if (!this._isInitialized) {
      this.init();
    }
    this._rootElement.appendChild(this.getElement());
  }

  getElement() {
    if (!this._element) {
      this._element = document.createElement(this._tagName);
      this._element.innerHTML = this.getHTML();
    }
    return this._element;
  }

  clear() {
    this.getElement().innerHTML = '';
  }

  update() {
    this.clear();
    this.getElement().innerHTML = this.getHTML();
  }

  remove() {
    this.getElement().remove();
    this._element = null;
    this._isInitialized = false;
  }
}
