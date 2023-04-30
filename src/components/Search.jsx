import "./Search.css";

import SearchIcon from "../../public/icon-search.svg";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
      </form>
    </div>
  );
}
