import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface StackGridProps {
  children: ReactNode;
  columns?: number;
}

const StackGrid = ({ columns, children }: StackGridProps) => {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
      className={styles.grid}
    >
      {children}
    </div>
  );
};

export default StackGrid;
