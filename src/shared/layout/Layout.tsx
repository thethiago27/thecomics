import styles from "./styles.module.scss";
import { ReactNode } from "react";
import Navbar from "@shared/navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
