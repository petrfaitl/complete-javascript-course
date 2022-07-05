class SearchView {

  _parentElement = document.querySelector('.search');


  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    // Attaching search result handler
    this._parentElement.addEventListener('submit', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();