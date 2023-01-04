import styles from "./styles.module.scss";
import logo from "./assets/logo.svg";
import SearchInput from "@shared/navbar/items/search-input";
import ButtonSignIn from "@shared/navbar/items/button-signin";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
        <SearchInput />
        <ButtonSignIn />
      </div>
    </nav>
  );
};

export default Navbar;
