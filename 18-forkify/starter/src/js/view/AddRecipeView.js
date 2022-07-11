import View from './View';
import icons from '../../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

class AddRecipeView extends View {

  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnCloseModal = document.querySelector('.btn--close-modal');

  _errorMessage = `
                Something has gone wrong. Try again :)
  `;

  _successMessage = `
    Recipe has been successfully uploaded.
  `;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }


  _generateMarkup() {

  }


  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerHideWindow() {
    this._btnCloseModal.addEventListener('click',
                                         this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }


  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
      const formData = [...new FormData(this)];
      const data = Object.fromEntries(formData);
      handler(data);

    });
  }


}

export default new AddRecipeView();