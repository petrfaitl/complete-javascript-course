import * as model from './model.js';
import recipeView from './view/RecipeView.js';
import searchView from './view/SearchView';
import resultsView from './view/ResultsView';
import paginationView from './view/PaginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1) ?? '';
    if (!id) return;
    //Load spinner
    recipeView.renderSpinner();

    //Loading recipe async
    await model.loadRecipe(id);

    // Render recipe in view
    // console.log(recipeView);
    recipeView.render(model.state.recipe);


  } catch (e) {
    // console.log(e.message);
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {

  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    // Render results
    resultsView.renderSpinner();
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

    // console.log(resultsView);

    resultsView.highlightActive();
  } catch (err) {
    console.log(err);
    resultsView.renderError(err.message);

  }

};

const controlPagination = function(evt) {
  const action = evt.target.closest('button').getAttribute('data-page');
  try {
    const page = model.state.search.page;
    const maxPage = model.state.search.maxPage;
    if (action === 'next' && page !== maxPage) {
      resultsView.render(model.getSearchResultsPage(page + 1));
    }
    if (action === 'prev' && page > 1) {
      resultsView.render(model.getSearchResultsPage(page - 1));

    }
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function() {
  // Pass the controlRecipes to our view class to get handled by load and
  // change listener
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();



