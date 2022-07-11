import * as model from './model.js';

import { MODAL_CLOSE_SECS } from './config';
import recipeView from './view/RecipeView.js';
import searchView from './view/SearchView';
import resultsView from './view/ResultsView';
import paginationView from './view/PaginationView';
import addRecipeView from './view/AddRecipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarkView from './view/BookmarkView';


// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1) ?? '';
    if (!id) return;
    //Load spinner
    recipeView.renderSpinner();

    // Reload results view ot update highlighted recipe
    resultsView.render(model.getSearchResultsPage());

    //Loading recipe async
    await model.loadRecipe(id);
    // console.log(model.state.recipe);

    // Render recipe in view

    recipeView.render(model.state.recipe);
    recipeView.addHandlerUpdateServings(controlServings);
    bookmarkView.render(model.state.bookmarks);


  } catch (e) {
    console.log(e.message);
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
    resultsView.render(model.getSearchResultsPage(1));
    // resultsView.highlightActive();

    // Render Pagination
    paginationView.render(model.state.search);


  } catch (err) {
    console.log(err);
    resultsView.renderError(err.message);

  }

};

const controlPagination = function(targetPage) {

  try {
    // const currentPage = model.state.search.page;
    const maxPage = model.state.search.maxPage;

    // Guard clause
    if (targetPage > maxPage || targetPage < 1) {
      return;
    }
    // Go to a page based on a click on UI
    resultsView.render(model.getSearchResultsPage(targetPage));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlServings = function(servings) {
  // Update servings in state
  model.updateServings(servings);
  // Update view
  recipeView.render(model.state.recipe);
};

const controlBookmarks = function() {

  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const loadBookmarks = function() {
  model.loadBookmarks();
  bookmarkView.render(model.state.bookmarks);
};

const addNewRecipeController = async function(data) {
  try {

    // Render a spinner
    addRecipeView.renderSpinner();


    const recipe = await model.uploadRecipe(data);

    // Render recipe
    recipeView.render(recipe);

    // Render Success Message
    addRecipeView.renderMessage();

    // Render bookmarks
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.toggleWindow();

    }, MODAL_CLOSE_SECS);


  } catch (e) {
    console.error(e);
    addRecipeView.renderError(e);
  }

};


const init = function() {
  // Pass the controlRecipes to our view class to get handled by load and
  // change listener
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  bookmarkView.addHandlerBookmarks(loadBookmarks);
  addRecipeView.addHandlerUpload(addNewRecipeController);

};
init();



