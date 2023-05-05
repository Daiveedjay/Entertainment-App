import data from "../data.json";
import { useState } from "react";

export const useSearch = () => {
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const searchFunc = (searchQuery) => {
    try {
      const filtered = data.filter((media) =>
        media.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Check if the search query exists in the JSON file
      if (filtered.length === 0) {
        throw new Error(
          `No results found for the given search query "${searchQuery}".`
        );
      }

      setFilteredData(filtered);
      setError(null);
      return filtered;
    } catch (err) {
      setFilteredData([]);
      setError(err);
      console.log(err);
    }
  };

  return { searchFunc, filteredData, error };
};
