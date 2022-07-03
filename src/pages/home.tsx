import { Profile } from "../components/Profile";
import { ExperienceBar } from "../components/ExpirienceBar";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import Head from "next/head";
import { GetServerSideProps } from "next";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import connectToDataBase from "../database";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  image: string;
  name: string;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile url={props.image} name={props.name} />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { login } = ctx.req.cookies;

  const db = await connectToDataBase(String(process.env.MONGODB_URI));
  const collection = db.collection("users");
  const busca = await collection.findOne({ login: login });

  return {
    props: {
      level: Number(busca!.level ?? 1),
      currentExperience: Number(busca!.currentExperience ?? 0),
      challengesCompleted: Number(busca!.challengesCompleted ?? 0),
      image: String(busca!.avatarImg),
      name: String(busca!.name ?? busca!.login),
    },
  };
};
