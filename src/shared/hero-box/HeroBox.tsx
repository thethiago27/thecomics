import styles from "./styles.module.scss";
import save from "./assets/save.svg";
import { Link } from "react-router-dom";

type Comics = {
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
  id: string;
};

interface HeroBoxProps {
  hero: Comics;
  url: "comics" | "characters";
}

const HeroBox = ({ hero, url }: HeroBoxProps) => {
  return (
    <div className={styles.container}>
      <Link to={`/${url}/${hero.id}`}>
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
