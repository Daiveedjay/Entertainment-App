import "./Search.css";

import SearchIcon from "../assests/icon-search.svg";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Search({ onSearchResults }) {
  const [search, setSearch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search.length > 0) onSearchResults(search);
  };

  return (
    <div className="search__component">
      <form onSubmit={handleSubmit} className="search__form">
        <img className="search--icon" src={SearchIcon} alt="" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for Movie or TV series"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className="search--submit">Submit</button>
      </form>
    </div>
  );
}
