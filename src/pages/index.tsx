import Layout from "../components/layout";
import Title from "../components/title/Title";
import Container from "../components/container/Container";
import HeroBanner from "../components/hero-banner";
import { GetServerSideProps } from "next";
import { get } from "../services/api-client";
import HeroBox from "../components/hero-box";
import StackGrid from "../components/stack-grid";
import { Comic } from "../interface/Comic";

type ComicsProps = {
  comics: Comic[];
};

const ComicsGrid = ({ comics }: ComicsProps) => {
  return (
    <StackGrid columns={3}>
      {comics.map((comic) => (
        <HeroBox key={comic.id} hero={comic} url="comics" />
      ))}
    </StackGrid>
  );
};

const Home = ({ comics }: ComicsProps) => {
  return (
    <Layout>
      <HeroBanner
        hero={{
          title: comics[2].title,
          id: comics[2].id,
        }}
      />
      <Container>
        <Title>Trend</Title>
        <ComicsGrid comics={comics} />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response: any = await get("comics");

  return {
    props: {
      comics: response.results,
    },
  };
};
export default Home;
