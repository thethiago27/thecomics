import styles from "./styles.module.scss";
import Title from "../title/Title";
import { Comic } from "../../interface/Comic";

type ComicDescriptionProps = {
  comic: Comic;
};

const ComicDescription = ({ comic }: ComicDescriptionProps) => {
  return (
    <div className={styles.content}>
      <img
        src={`${comic?.thumbnail?.path}.${comic?.thumbnail.extension}`}
        alt={comic?.title}
      />
      <div className={styles.description}>
        <Title>{comic?.title}</Title>
        {comic?.description.length > 0 ? (
          <p className={styles.short}>{comic?.description}</p>
        ) : (
          <p className={styles.short}>No description available</p>
        )}
      </div>
    </div>
  );
};

export default ComicDescription;
