export const state = {
  recipe: {}, search: {}, bookmarks: []

};
export const loadRecipe = async function(hashId) {
  // https://forkify-api.herokuapp.com/v2

  try {
    const recipeUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${hashId}`;
    const response = await fetch(recipeUrl);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (status: ${response.status})`);

    let { recipe } = data.data;

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
    console.log(state);
    // return state.recipe;
  } catch (error) {
    console.log(error);
  }
};