import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface AsyncContainerProps {
  status: string;
  children: ReactNode;
}

export const AsyncContainer = ({
  status,
  children,
  ...rest
}: AsyncContainerProps) => {
  if (status === "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.loader} />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  return <div {...rest}>{children}</div>;
};
