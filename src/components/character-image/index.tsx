import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Character } from "../../interface/Character";

type CharacterImageProps = {
  character: Character;
};
export const CharacterImage = ({ character }: CharacterImageProps) => {
  const router = useRouter();

  return (
    <div className={styles.details}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        onClick={() => router.push(`/characters/${character.id}`)}
        alt={character.name}
      />
      <p>{character.name}</p>
    </div>
  );
};

export default CharacterImage;
