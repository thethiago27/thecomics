import styles from "./styles.module.scss";
import Link from "next/link";

type HeroBannerProps = {
  hero: HeroBannerInterface;
};

interface HeroBannerInterface {
  title: string;
  id: string;
}

const HeroBanner = ({ hero }: HeroBannerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{hero.title}</p>
        <Link href={`/comics/${hero.id}`}>
          <span>See more</span>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
