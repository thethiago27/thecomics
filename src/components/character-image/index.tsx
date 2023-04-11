import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Character } from "../../interface/Character";
import Image from "next/image";

type CharacterImageProps = {
  character: Character;
};
export const CharacterImage = ({ character }: CharacterImageProps) => {
  const router = useRouter();

  return (
    <div
      className={styles.details}
      onClick={() => router.push(`/characters/${character.id}`)}
    >
      <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        width={500}
        height={500}
      />
      <p>{character.name}.l</p>
    </div>
  );
};

export default CharacterImage;
