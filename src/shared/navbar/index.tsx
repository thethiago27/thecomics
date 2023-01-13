import styles from "./styles.module.scss";
import SearchInput from "./items/search-input";
import ButtonSignIn from "./items/button-github";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <img
          src="/assets/logo.svg"
          alt="logo"
          onClick={() => router.push("/")}
        />
        <SearchInput />
        <ButtonSignIn />
      </div>
    </nav>
  );
};

export default Navbar;
