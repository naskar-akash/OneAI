import { searchTool } from "../config/tavily.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const searchAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "search");
    const results = await searchTool.invoke({
      query: state.prompt,
    });

    await deductCredits(state.userId, "search");

    return {
      ...state,
      searchResults: results.results ?? [],
      images: results.images ?? [],
      searchError: null,
    };
  } catch (error) {
    if (error?.status == 429) {
      return {
        ...state,
        aiResponse: error?.data?.message,
      };
    }

    return {
      ...state,
      searchResults: [],
      images: [],
      searchError: error.message,
    };
  }
};
