import styles from "./styles.module.scss";
import Link from "next/link";
import { Comic } from "../../interface/Comic";

interface HeroBoxProps {
  hero: Comic;
  url: "comics" | "characters";
}

const HeroBox = ({ hero, url }: HeroBoxProps) => {
  return (
    <div className={styles.container}>
      <Link href={`/${url}/${hero.id}`}>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.title}
          className={styles.image}
        />
      </Link>
      <p className={styles.comicTitle}>{hero.title}</p>
    </div>
  );
};

export default HeroBox;
