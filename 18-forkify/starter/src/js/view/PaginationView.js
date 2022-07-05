import View from './View';
import icons from '../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


class PaginationView extends View {
  _data;
  _parentElement = document.querySelector('.pagination');


  _generateMarkup() {
    console.log(this._data);
    let markup = '';
    if (this._data.page > 1) {
      markup += this._renderPreviousPaginationMarkup();
    }
    if (this._data.page < this._data.maxPage) {

      markup += this._renderNextPaginationMarkup();
    }
    return markup;
  }


  _renderNextPaginationMarkup() {
    return `
        <button class='btn--inline pagination__btn--next' data-page='next'>
        <span>Page ${this._data.page + 1}</span>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-right'></use>
        </svg>
      </button>
    `;
  }

  _renderPreviousPaginationMarkup() {
    return `
    <button class='btn--inline pagination__btn--prev' data-page='prev'>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-left'></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
    `;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', handler);
  }

}

export default new PaginationView();