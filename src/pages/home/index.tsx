import Layout from "@shared/layout";
import HeroBanner from "../home/items/hero-banner";
import styles from "./styles.module.scss";
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

const Home = () => {
  const [asyncComics, setAsyncComics] = useState<AsyncData<Comics[]>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await get("comics");

        setAsyncComics({
          status: "loaded",
          data: response.results,
        });
      } catch (e) {
        setAsyncComics({ status: "error", data: { message: e.message } });
      }
    })();
  }, []);

  return (
    <Layout>
      <HeroBanner
        hero={{
          title: "Hello World",
          id: "1",
        }}
      />
      <div className={styles.container}>
        <p className={styles.title}>Trend</p>
        <AsyncContainer className={styles.comics} status={asyncComics.status}>
          {asyncComics.status === "loaded" && (
            <>
              {asyncComics.data.map((comic) => (
                <HeroBox key={comic.id} hero={comic} url="comics" />
              ))}
            </>
          )}
        </AsyncContainer>
      </div>
    </Layout>
  );
};

export default Home;
