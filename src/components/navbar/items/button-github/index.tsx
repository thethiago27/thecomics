import styles from "./styles.module.scss";

const ButtonGithub = () => {
  const openExternalLink = () => {
    window.open("https://github.com/thethiago27", "_blank");
  };

  return (
    <button
      data-testid="github-button"
      className={styles.button}
      onClick={openExternalLink}
    >
      <img src="/assets/icons/link.svg" alt="Link" />
      <span>Github</span>
    </button>
  );
};

export default ButtonGithub;
