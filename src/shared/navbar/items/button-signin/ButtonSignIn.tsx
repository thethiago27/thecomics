import styles from "./styles.module.scss";
import link from "./assets/link.svg";

const ButtonSignIn = () => {
  const openExternalLink = () => {
    window.open("https://github.com/thethiago27", "_blank");
  };

  return (
    <button className={styles.button} onClick={openExternalLink}>
      <img src={link} alt="Link" />
      <span>Github</span>
    </button>
  );
};

export default ButtonSignIn;
