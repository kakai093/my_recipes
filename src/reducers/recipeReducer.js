
export const recipeReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return {
                ...state,
                recipe: [...state.recipe, action.payload]
            }
        case 'REMOVE_RECIPE':
            return {
                ...state,
                recipe: state.recipe.filter(utang => utang.id !== action.payload)
            }
        case 'EDIT_RECIPE':
            return state
        case 'FILTER':
            const newList = action.payload !== 'all' ? state.recipe.filter(filter => filter.dish === action.payload) : [];
            return {
                ...state,
                filteredRecipes: newList,
            };
        default:
            return state;
    }
}
