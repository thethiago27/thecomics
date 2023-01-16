import { FormEvent, useReducer } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const SearchInput = () => {
  const [search, updateSearch] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      value: "",
    }
  );
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.value === "") return;

    router.push(`/search/${search.value}`);
  };

  return (
    <form data-testid="search-input" onSubmit={handleSubmit}>
      <label className={styles.label}>
        <img src="/assets/icons/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search something..."
          value={search.value}
          onChange={(e) => updateSearch({ value: e.target.value })}
        />
      </label>
    </form>
  );
};

export default SearchInput;
