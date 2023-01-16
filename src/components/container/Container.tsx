import { ReactNode } from "react";
import styles from "./styles.module.scss";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container} data-testid="container">
      {children}
    </div>
  );
};

export default Container;
