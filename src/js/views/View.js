import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object|Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Jaime Motta
   * @todo Finish implementation
   */
  render(data, render = true) {
    // console.log('View->render', this);
    // console.log(data);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Generete a new virtual DOM from HTML in an string
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // Compare DOM Elements
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(error = { status: 400 }) {
    console.log('View-->renderError', this._errorMessage[error.status]);
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${this._errorMessage[error.status]}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg = { status: 200 }) {
    console.log('renderMessage->', msg);
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${this._message[msg.status]}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
