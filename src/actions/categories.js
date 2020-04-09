import axios from "axios";

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  categories
});

export const startSetCategories = () => {
  return async dispatch => {
    try {
      const url = `${process.env.REACT_APP_API_URL+"category/"}`
      console.log("fetching url from action categories", url)
      const response = await axios.get(url);
      dispatch(setCategories(response.data.results));
    } catch (e) {
      throw new Error("Could not retrieve categories...");
    }
  };
};