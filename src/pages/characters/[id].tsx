import { GetStaticProps } from "next";
import Layout from "../../components/layout";
import ProfileCover from "../../components/profile-cover";
import { get } from "../../services/api-client";
import { Comic } from "../../interface/Comic";
import { Character } from "../../interface/Character";
import Title from "../../components/title/Title";
import Container from "../../components/container/Container";
import StackGrid from "../../components/stack-grid";
import HeroBox from "../../components/hero-box";
import Head from "next/head";
import DynamicHead from "../../components/dynamic-head";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id }: any = context.params;

  const response: any = await get(`characters/${id}`);

  const results = response.results && response.results[0];

  const comics = await Promise.all(
    results.comics.items.map(async (comic: any) => {
      const comicId = comic.resourceURI.split("/").pop();

      const response: any = await get(`comics/${comicId}`);

      return response.results;
    })
  );

  return {
    props: {
      comics: comics[0],
      character: results,
    },
  };
};

type CharactersDetailsProps = {
  comics: Comic[];
  character: Character;
};

const CharactersDetails = ({ comics, character }: CharactersDetailsProps) => {
  return (
    <Layout>
      <DynamicHead
        title={character?.name}
        description={character?.description}
        image={`${character.thumbnail.path}.${character.thumbnail.path}`}
      />
      <ProfileCover image={character?.thumbnail} name={character?.name} />
      <Container>
        <Title>All Comics</Title>
        <StackGrid columns={3}>
          {comics?.map((comic) => (
            <HeroBox hero={comic} key={comic.id} url={"comics"} />
          ))}
        </StackGrid>
      </Container>
    </Layout>
  );
};

export default CharactersDetails;
