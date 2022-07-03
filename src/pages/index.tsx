import LoginGitInput from "../components/LoginGitInput";

import Head from "next/head";

import styles from '../styles/pages/Login.module.css';

export default function Login() {
  return(
    <>
      <Head>
        <title>Login | move.it</title>
      </Head>
      <div 
        className={styles.container}
      >
        <div className={styles.itensContainer}>
          <img src="logo-full.svg" alt="logo"/>
          <h1 >Bem-vindo</h1>
          <div className={styles.loginText} >
            <img src="/icons/github.svg" alt="Github Logo"/>
            <div>
              <p>Faça login com seu Github</p>
              <p>para começar</p>
            </div>
          </div>
          <LoginGitInput />
        </div>
      </div>
    </>
  );
}
