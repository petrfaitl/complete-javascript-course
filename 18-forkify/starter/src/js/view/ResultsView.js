import View from './View';
import icons from '../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


class ResultsView extends View {
  _data;
  _errorMessage = 'No recipe found for your query. Try again.';
  _parentElement = document.querySelector('.results');


  _generateMarkup() {
    return this._data.map(this._renderMarkupPreview).join('');
  }

  _renderMarkupPreview(rec) {
    return `
      <li class='preview'>
        <a class='preview__link' href='#${rec.id}'>
          <figure class='preview__fig'>
            <img src='${rec.image}' alt='${rec.title}' />
          </figure>
          <div class='preview__data'>
            <h4 class='preview__title'>${rec.title}</h4>
            <p class='preview__publisher'>${rec.publisher}</p>
            
          </div>
        </a>
      </li>
    `;
  }

  highlightActive() {
    this._parentElement.addEventListener('click', function(evt) {
      const lastActive = this.querySelector(
        '.preview__link--active');
      if (lastActive) {
        lastActive.classList.remove('preview__link--active');
      }
      evt.target.closest('a').classList.add('preview__link--active');
    });
  }

}


export default new ResultsView();