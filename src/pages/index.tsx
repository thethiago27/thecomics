import Layout from "../components/layout";
import Title from "../components/title/Title";
import Container from "../components/container/Container";
import HeroBanner from "../components/hero-banner";
import { GetServerSideProps } from "next";
import { get } from "../services/api-client";
import Index from "../components/hero-box";
import StackGrid from "../components/stack-grid";
import { Comic } from "../interface/Comic";
import DynamicHead from "../components/dynamic-head";

type ComicsProps = {
  comics: Comic[];
};

const ComicsGrid = ({ comics }: ComicsProps) => {
  return (
    <StackGrid columns={3}>
      {comics.map((comic) => (
        <Index key={comic.id} hero={comic} url="comics" />
      ))}
    </StackGrid>
  );
};

const Home = ({ comics }: ComicsProps) => {
  return (
    <Layout>
      <DynamicHead title={"Home"} description={"Welcome to The Comics"} />
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
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const response: any = await get("comics");

  return {
    props: {
      comics: response.results,
    },
  };
};
export default Home;
