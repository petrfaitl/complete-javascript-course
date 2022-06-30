import * as model from './model.js';
import recipeView from './view/RecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// console.log(icons);

// const recipeContainer = document.querySelector('.recipe');
// const searchResultContainer = document.querySelector('.results');

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


///////////////////////////////////////


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
    console.error(e.message);
  }
};


// Attaching different event listeners with the same callback via array method
['hashchange', 'load'].forEach(ev => window.addEventListener(ev,
                                                             controlRecipes));

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
