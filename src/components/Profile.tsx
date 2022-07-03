import { ChallengeContext } from "../contexts/ChallengesContext";
import { useContext } from "react";
import styles from "../styles/components/Profile.module.css";

export function Profile({ url, name }) {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src={url} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
