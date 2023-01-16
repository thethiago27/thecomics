import Layout from "../../components/layout";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import { Suspense, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import TabButton from "../../components/tab-button";
import { get } from "../../services/api-client";
import { Comic } from "../../interface/Comic";
import HeroBox from "../../components/hero-box";
import StackGrid from "../../components/stack-grid";
import CharacterImage from "../../components/character-image";
import { Character } from "../../interface/Character";

type SearchTypeTab = "comics" | "characters";

const Search = () => {
  const router = useRouter();

  const { search } = router.query;

  const [isPending, startTransition] = useTransition();
  const [searchTab, setSearchTab] = useState<SearchTypeTab>("comics");

  const [comics, setComics] = useState<Comic[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleSearchTab = (tab: SearchTypeTab) => {
    startTransition(() => {
      setSearchTab(tab);
    });
  };

  const fetchSelectedTab = useMemo(async () => {
    console.log("fetchSelectedTab");
    try {
      const response: any =
        searchTab === "comics"
          ? await get("comics", { titleStartsWith: search })
          : await get("characters", { nameStartsWith: search });

      searchTab === "comics"
        ? setComics(response.results)
        : setCharacters(response.results);
    } catch (e) {
      console.log(e);
    }
  }, [searchTab, search]);

  return (
    <Layout>
      <Container>
        <Title>Result of your search... {search}</Title>
        <div className={styles.buttons}>
          {Array.from(["comics", "characters"]).map((type: any) => (
            <TabButton
              onClick={() => handleSearchTab(type)}
              isActive={searchTab === type}
              key={type}
            >
              {type}
            </TabButton>
          ))}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {searchTab === "comics" && (
            <StackGrid columns={3}>
              {comics.map((comic) => (
                <HeroBox hero={comic} url="comics" key={comic.id} />
              ))}
            </StackGrid>
          )}
          {searchTab === "characters" && (
            <StackGrid columns={3}>
              {characters.map((character) => (
                <CharacterImage character={character} key={character.id} />
              ))}
            </StackGrid>
          )}
        </Suspense>
      </Container>
    </Layout>
  );
};

export default Search;
