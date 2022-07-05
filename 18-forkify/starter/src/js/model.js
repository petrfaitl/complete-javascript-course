import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers';
import 'regenerator-runtime/runtime';
import recipeView from './view/RecipeView';

export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1, resultsPerPage: RES_PER_PAGE },
  bookmarks: []


};
export const loadRecipe = async function(id) {
  // https://forkify-api.herokuapp.com/v2

  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;


    // Reformat the recipe object without underscores; simplify for
    // retrieval later; save it to the state object;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time

    };
    // console.log(state);
    // return state.recipe;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.query = query;
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      };

    });


  } catch (err) {
    throw err;
  }
};

// Returns only a slice of the search result array
export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  state.search.maxPage = Math.ceil(state.search.results.length / state.search.resultsPerPage);
  const sliceStart = (page - 1) * state.search.resultsPerPage;
  return state.search.results.slice(sliceStart,
                                    sliceStart + state.search.resultsPerPage);
};