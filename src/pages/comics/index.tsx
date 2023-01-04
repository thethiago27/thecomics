import Layout from "@shared/layout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AsyncData } from "@shared/async-container/models/async-data";
import { get } from "@shared/api-client";
import { AsyncContainer } from "@shared/async-container/AsyncContainer";
import styles from "./styles.module.scss";

type ComicDetails = {
  characters: Character[];
  comic: Comic;
};

type Character = {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

type Comic = {
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
  id: string;
  description: string;
};

const Comics = () => {
  const [asyncComics, setAsyncComics] = useState<AsyncData<ComicDetails>>({
    status: "loading",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await get(`comics/${id}`);

        if (response.results) {

          const { characters } = response.results[0];

          const charactersList = characters.items.map(async (character) => {
            const characterId = character.resourceURI.split("/").pop();

            const response = await get(`characters/${characterId}`);

            return response.results && response.results[0];
          });

          const data = {
            characters: await Promise.all(charactersList),
            comic: response.results[0],
          };

          setAsyncComics({ status: "loaded", data });
        }
      } catch (e) {
        console.error("MarvelAPI#Error", e);
        setAsyncComics({ status: "error", data: { message: e.message } });
      }
    })();
  }, []);

  return (
    <Layout>
      <AsyncContainer className={styles.container} status={asyncComics.status}>
        {asyncComics.status === "loaded" && (
          <>
            <div className={styles.content}>
              <img
                src={`${asyncComics.data.comic.thumbnail.path}.${asyncComics.data.comic.thumbnail.extension}`}
                alt={asyncComics.data.comic.title}
              />
              <div className={styles.description}>
                <p className={styles.title}>{asyncComics.data.comic.title}</p>
                <p className={styles.short}>
                  {asyncComics.data.comic.description}
                </p>
              </div>
            </div>
            <p className={styles.title}>Characters</p>
            <div className={styles.personas}>
              {asyncComics.data.characters.map((character) => (
                <div className={styles.details}>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    onClick={() => navigate(`/characters/${character.id}`)}
                  />
                  <p>{character.name}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </AsyncContainer>
    </Layout>
  );
};

export default Comics;
