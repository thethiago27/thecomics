import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import searchIcon from "./assets/search.svg";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: HTMLInputElement) => {
    setSearch(e.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.label}>
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search something..."
          value={search}
          onChange={(e) => handleSearch(e.target)}
        />
      </label>
    </form>
  );
};

export default SearchInput;
