import styles from "./styles.module.scss";
import Link from "next/link";
import { Comic } from "../../interface/Comic";
import Image from "next/image";

interface HeroBoxProps {
  hero: Comic;
  url: "comics" | "characters";
}

const Index = ({ hero, url }: HeroBoxProps) => {
  return (
    <div className={styles.container}>
      <Link href={`/${url}/${hero.id}`}>
        <Image
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.title}
          className={styles.image}
          width={500}
          height={500}
        />
      </Link>
      <p className={styles.comicTitle}>{hero.title}</p>
    </div>
  );
};

export default Index;
