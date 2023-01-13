import { GetStaticProps } from "next";
import Layout from "../../shared/layout";
import ProfileCover from "../../shared/profile-cover";
import { get } from "../../shared/api-client";
import { Comic } from "../../interface/Comic";
import { Character } from "../../interface/Character";
import Title from "../../shared/title/Title";
import Container from "../../shared/container/Container";
import StackGrid from "../../shared/stack-grid";
import HeroBox from "../../shared/hero-box";

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1009610" } }],
    fallback: true,
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

const CharacterComics = ({ comics }: { comics: Comic[] }) => {
  return (
    <StackGrid columns={3}>
      {comics?.map((comic) => (
        <HeroBox hero={comic} key={comic.id} url={"comics"} />
      ))}
    </StackGrid>
  );
};

const CharactersDetails = ({ comics, character }: CharactersDetailsProps) => {
  return (
    <Layout>
      <ProfileCover image={character?.thumbnail} name={character?.name} />
      <Container>
        <Title>All Comics</Title>
        <CharacterComics comics={comics} />
      </Container>
    </Layout>
  );
};

export default CharactersDetails;
