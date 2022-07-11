import View from './View';
import icons from '../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


class PaginationView extends View {
  _data;
  _parentElement = document.querySelector('.pagination');


  _generateMarkup() {
    let markup = '';
    const currentPage = this._data.page;
    if (this._data.page > 1) {
      markup += this._renderPreviousPaginationMarkup(currentPage);
    }
    if (currentPage < this._data.maxPage) {

      markup += this._renderNextPaginationMarkup(currentPage);
    }
    return markup;
  }


  _renderNextPaginationMarkup(page) {
    return `
        <button class='btn--inline pagination__btn--next' data-page='${page + 1}'>
        <span>Page ${page + 1}</span>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-right'></use>
        </svg>
      </button>
    `;
  }

  _renderPreviousPaginationMarkup(page) {
    return `
    <button class='btn--inline pagination__btn--prev' data-page='${page - 1}'>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-left'></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      const goToPage = parseInt(btn.getAttribute('data-page'));

      return handler(goToPage);
    });
  }

}

export default new PaginationView();