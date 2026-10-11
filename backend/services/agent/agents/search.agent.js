import { searchTool } from "../config/tavily.js";

export const searchAgent = async (state) => {
  try {
    const results = await searchTool.invoke({
      query: state.prompt
    });

    return {
      ...state,
      searchResults: results.results ?? [],
      images: results.images ?? [],
      searchError: null
    };
  } catch (error) {

    return {
      ...state,
      searchResults: [],
      images: [],
      searchError: error.message
    };
  }
};