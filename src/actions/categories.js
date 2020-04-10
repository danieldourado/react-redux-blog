import agent from "../agent";

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  categories
});

export const startSetCategories = () => {
  return async dispatch => {
    const response = await agent.Categories.get();
    dispatch(setCategories(response));
  };
};