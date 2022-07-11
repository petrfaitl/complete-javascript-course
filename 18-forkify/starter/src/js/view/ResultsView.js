import View from './View';
import icons from 'url:../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


class ResultsView extends View {
  // _data;
  _errorMessage = 'No recipe found for your query. Try again.';
  _parentElement = document.querySelector('.results');


  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview.bind(this)).join('');
  }

  _generateMarkupPreview(rec) {
    const id = window.location.hash.slice(1);
    return `
      <li class='preview'>
        <a class='preview__link ${rec.id === id
                                  ? 'preview__link--active'
                                  : ''}' href='#${rec.id}'>
          <figure class='preview__fig'>
            <img src='${rec.image}' alt='${rec.title}' />
          </figure>
          <div class='preview__data'>
            <h4 class='preview__title'>${rec.title}</h4>
            <p class='preview__publisher'>${rec.publisher}</p>
             
             <div class='preview__user-generated ${rec.key ? '' : 'hidden'}'>
              <svg>
                <use href='${icons}#icon-user'></use>
              </svg>
            </div>
            
          </div>
        </a>
      </li>
    `;
  }


}


export default new ResultsView();