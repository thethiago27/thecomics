import { ReactNode } from "react";
import styles from "./styles.module.scss";

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return <p className={styles.title}>{children}</p>;
};

export default Title;
