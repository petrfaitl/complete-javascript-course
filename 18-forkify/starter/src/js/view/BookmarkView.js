import View from './View';
import icons from '../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

class BookmarkView extends View {
  _data;
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `
                No bookmarks yet. Find a nice recipe and bookmark it :)
  `;

  _generateMarkup() {
    return this._data.map(this._generateBookmarkMarkup);
  }

  _generateBookmarkMarkup(recipe) {
    return `
        <li class='preview'>
              <a class='preview__link' href='#${recipe.id}'>
                <figure class='preview__fig'>
                  <img src=' ${recipe.image}' alt=' ${recipe.title}' />
                </figure>
                <div class='preview__data'>
                  <h4 class='preview__title'>
                    ${recipe.title}
                  </h4>
                  <p class='preview__publisher'>${recipe.publisher}</p>
                  <div class='preview__user-generated ${recipe.key
                                                        ? ''
                                                        : 'hidden'}'>
                  <svg>
                    <use href='${icons}#icon-user'></use>
                  </svg>
                </div>
                  
                </div>
              </a>
            </li>
    `;
  }

  renderError(message = this._errorMessage) {
    this._clear();
    const markup = `
    <div class='message'>
              <div>
                <svg>
                  <use href='${icons}#icon-smile'></use>
                </svg>
              </div>
              <p>
                ${message}
              </p>
            </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();