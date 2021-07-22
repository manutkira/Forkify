import icons from 'url:../../img/icons.svg';

export default class view {
  data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data the data to be render (e.g recipe)
   * @param {Boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @author Manut Kira
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;
    const markup = this.generateMarkup();

    if (!render) return markup;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this.data = data;
    const newMarkup = this.generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newEl = Array.from(newDom.querySelectorAll('*'));
    const curEl = Array.from(this.parentElement.querySelectorAll('*'));

    newEl.forEach((newE, i) => {
      const curE = curEl[i];

      if (!newE.isEqualNode(curE) && newE.firstChild?.nodeValue.trim() !== '') {
        curE.textContent = newE.textContent;
      }

      if (!newE.isEqualNode(curE)) {
        Array.from(newE.attributes).forEach(attr =>
          curE.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
     <div class="spinner">
     <svg>
       <use href="${icons}#icon-loader"></use>
     </svg>
     </div>
     `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this.errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this.message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
