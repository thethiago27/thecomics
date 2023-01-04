import Layout from "@shared/layout";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { AsyncData } from "@shared/async-container/models/async-data";
import { useEffect, useState } from "react";
import { get } from "@shared/api-client";
import { AsyncContainer } from "@shared/async-container/AsyncContainer";
import ProfileCover from "../character/items/profile-cover/ProfileCover";
import HeroBox from "@shared/hero-box";

type Character = {
  character: {
    id: string;
    name: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  };
  comics: Comic[];
};

type Comic = {
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
  id: string;
};

const Character = () => {
  const { id } = useParams();

  const [asyncCharacter, setAsyncCharacter] = useState<AsyncData<Character>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await get(`characters/${id}`);

        if (response.results) {
          const comics = response.results[0].comics.items.map(async (comic) => {
            const comicId = comic.resourceURI.split("/").pop();

            const response = await get(`comics/${comicId}`);

            return response.results;
          });

          const character = {
            character: response.results[0],
            comics: await Promise.all(comics),
          };

          setAsyncCharacter({
            status: "loaded",
            data: character,
          });
        }
      } catch (e) {
        setAsyncCharacter({ status: "error", data: { message: e.message } });
      }
    })();
  }, []);

  return (
    <Layout>
      <AsyncContainer
        className={styles.container}
        status={asyncCharacter.status}
      >
        {asyncCharacter.status === "loaded" && (
          <>
            <ProfileCover
              image={asyncCharacter.data.character.thumbnail}
              name={asyncCharacter.data.character.name}
            />
            <div className={styles.content}>
              <p className={styles.title}>All Comics</p>
              <div className={styles.comics}>
                {asyncCharacter.data.comics.map((comic) => (
                  <HeroBox hero={comic[0]} url="comics" key={comic[0].id} />
                ))}
              </div>
            </div>
          </>
        )}
      </AsyncContainer>
    </Layout>
  );
};

export default Character;
