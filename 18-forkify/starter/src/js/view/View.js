import icons from 'url:../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default class View {
  _data;
  _errorMessage;
  _successMessage;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup());
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
  }


  renderSpinner() {
    const markup = `
    <div class='spinner'>
        <svg>
          <use href='${icons}#icon-loader'></use>
        </svg>
      </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    this._clear();
    const markup = `
    <div class='error'>
        <div>
          <svg>
            <use href='${icons}/icons.svg#icon-alert-triangle'></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    this._clear();
    const markup = `
    <div class='message'>
        <div>
          <svg>
            <use href='${icons}/icons.svg#icon-smile'></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}