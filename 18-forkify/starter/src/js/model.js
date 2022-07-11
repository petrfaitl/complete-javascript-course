import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers';
import 'regenerator-runtime/runtime';

export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1, resultsPerPage: RES_PER_PAGE },
  bookmarks: []
};

const createRecipeObject = function(data) {
  const { recipe } = data.data;


  // Reformat the recipe object without underscores; simplify for
  // retrieval later; save it to the state object;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    key: recipe.key
  };
};
export const loadRecipe = async function(id) {
  // https://forkify-api.herokuapp.com/v2

  try {
    const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === state.recipe.id);
    // console.log(state);
    // return state.recipe;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    const { recipes } = data.data;
    state.search.query = query;
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        key: recipe.key
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


// Increase or decrease servings in the RecipeView
export const updateServings = function(newServings) {
  if (newServings <= 0) return;
  const servings = state.recipe.servings;
  state.recipe.ingredients = state.recipe.ingredients.map(ing => {
    const newIng = {
      quantity: ing.quantity,
      unit: ing.unit,
      description: ing.description
    };
    if (ing.quantity) {
      newIng.quantity = (ing.quantity / servings * newServings);
    }

    return newIng;
  });
  state.recipe.servings = newServings;

};

export const addBookmark = function(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // console.log(state.bookmarks);
  saveBookmarks();
};

export const deleteBookmark = function(id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  // console.log(recipe);
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  saveBookmarks();
};

const saveBookmarks = function() {

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

};
export const loadBookmarks = function() {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

};

export const uploadRecipe = async function(data) {

  try {
    const recipe = {
      title: data.title,
      publisher: data.publisher,
      source_url: data.sourceUrl,
      image_url: data.image,
      servings: parseInt(data.servings),
      cooking_time: parseInt(data.cookingTime)
    };

    recipe.ingredients = Object.entries(data)
                               .filter(el => el[0].includes('ingredient') && el[1] !== ''
                               ).map(str => {
        const ingArr = str[1]
          .split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          throw new Error('Wrong ingredients format. Please try again with' +
                            ' the correct punctuation.');
        }
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? parseFloat(quantity) : null,
          unit,
          description
        };

      });


    const dataRtn = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(dataRtn);
    state.recipe.key = KEY;
    addBookmark(state.recipe);
    return state.recipe;
  } catch (e) {
    throw e;
  }
};