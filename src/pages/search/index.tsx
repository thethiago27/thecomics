import Layout from "@shared/layout";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "@shared/api-client";
import { AsyncData } from "@shared/async-container/models/async-data";
import { AsyncContainer } from "@shared/async-container/AsyncContainer";
import HeroBox from "@shared/hero-box";

type Comics = {
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
  id: string;
};

type SearchType = "comics" | "characters";
const Search = () => {

  const { search } = useParams();

  const [asyncComics, setAsyncComics] = useState<AsyncData<Comics[]>>({
    status: "loading",
  });
  const [searchType, setSearchType] = useState<SearchType>("comics");

  useEffect(() => {
    setAsyncComics({ status: "loading" });
    (async () => {
      try {
        const response =
          searchType === "comics"
            ? await get("comics", { titleStartsWith: search })
            : await get("characters", { nameStartsWith: search });

        setAsyncComics({
          status: "loaded",
          data: response.results,
        });
      } catch (e) {
        setAsyncComics({status: "error", data: {message: "Error while fetching data"}});
      }
    })();
  }, [searchType, search]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          <p>Result of your search...</p>
        </div>
        <div className={styles.buttons}>
          {Array.from(["comics", "characters"]).map((type: SearchType) => (
            <button
              key={type}
              className={searchType === type ? styles.active : ""}
              onClick={() => setSearchType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <AsyncContainer className={styles.comics} status={asyncComics.status}>
          {asyncComics.status === "loaded" && (
            <>
              {asyncComics.data.map((comic) => (
                <HeroBox key={comic.id} hero={comic} url={searchType} />
              ))}
            </>
          )}
        </AsyncContainer>
      </div>
    </Layout>
  );
};

export default Search;
