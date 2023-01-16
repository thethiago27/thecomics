import styles from "./styles.module.scss";

type ProfileCoverType = {
  path: string;
  extension: string;
};

interface ProfileCoverInterface {
  image: ProfileCoverType;
  name: string;
}

const ProfileCover = ({ image, name }: ProfileCoverInterface) => {
  return (
    <div className={styles.profileCover}>
      <div
        className={styles.background}
        style={{
          background: `url(${image?.path}.${image?.extension})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.5)",
        }}
      />
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img src={`${image?.path}.${image?.extension}`} alt="profile" />
          <div className={styles.description}>
            <p className={styles.title}>{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
