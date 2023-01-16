import Layout from "../../components/layout";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import ComicDescription from "../../components/comic-description";
import { GetStaticProps } from "next";
import { get } from "../../services/api-client";
import { Comic } from "../../interface/Comic";
import { Character } from "../../interface/Character";
import StackGrid from "../../components/stack-grid";
import CharacterImage from "../../components/character-image";

type ComicDetailsProps = {
  comic: Comic;
  characters: Character[];
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1590" } }, { params: { id: "1308" } }],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id || "";

  const response: any = await get(`/comics/${id}`);
  const result = response.results && response.results[0];

  const characters = await Promise.all(
    result.characters.items.map(async (character: any) => {
      const characterId = character.resourceURI.split("/").pop();
      const response: any = await get(`characters/${characterId}`);
      return response.results && response.results[0];
    })
  );

  return {
    props: {
      comic: result,
      characters: characters,
    },
  };
};

const ImageCharacterGrid = ({ characters }: { characters: Character[] }) => {
  return (
    <StackGrid columns={4}>
      {characters?.map((character) => (
        <CharacterImage key={character.id} character={character} />
      ))}
    </StackGrid>
  );
};

const ComicsDetails = ({ comic, characters }: ComicDetailsProps) => {
  return (
    <Layout>
      <Container>
        <ComicDescription comic={comic} />
        <Title>Characters</Title>
        <ImageCharacterGrid characters={characters} />
      </Container>
    </Layout>
  );
};

export default ComicsDetails;
