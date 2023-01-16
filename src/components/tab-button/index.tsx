import { ReactNode } from "react";
import styles from "./styles.module.scss";

type TabButtonProps = {
  onClick: () => void;
  children: ReactNode;
  isActive?: boolean;
};
const TabButton = ({ onClick, isActive, children }: TabButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isActive && styles.active}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TabButton;
