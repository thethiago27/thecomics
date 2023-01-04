import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

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
        <Link to={`/hero/${hero.id}`}>
          <span>See more</span>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
