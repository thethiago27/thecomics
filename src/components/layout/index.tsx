import styles from "./styles.module.scss";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../navbar";

interface LayoutProps {
  children: ReactNode;
}

type Loader = { status: "loading" } | { status: "completed" };

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const [loader, setLoader] = useState<Loader>({ status: "completed" });

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoader({ status: "loading" });
    });

    router.events.on("routeChangeComplete", () => {
      setLoader({ status: "completed" });
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setLoader({ status: "loading" });
      });

      router.events.off("routeChangeComplete", () => {
        setLoader({ status: "completed" });
      });
    };
  }, [router]);

  return (
    <div data-testid="layout" className={styles.container}>
      <Navbar />
      <main data-testid="children" className={styles.content}>
        {loader.status === "loading" ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader} />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default Layout;
