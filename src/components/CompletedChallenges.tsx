import { ChallengeContext } from "../contexts/ChallengesContext";
import { useContext } from "react";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{String(challengesCompleted).padStart(2, "0")}</span>
    </div>
  );
}
