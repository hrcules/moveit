import { FormEvent, useEffect, useState } from "react";
import Router from "next/router";

import api from "../pages/api/gitApi";
import axios from "axios";

import Cookies from "js-cookie";

import styles from "../styles/components/LoginGitInput.module.css";

export default function LoginGitInput() {
  const [username, setUsername] = useState("");
  const [isVerification, setIsVerification] = useState<any | null>(null);

  async function handleSingUpLogin(event: FormEvent) {
    event.preventDefault();

    await api
      .get(`/users/${username}`)
      .then((resp) => {
        axios.post("/api/subscribe", { username: resp.data });
        Cookies.set("login", String(resp.data.login));
        return setIsVerification(true);
      })
      .catch(() => {
        return setIsVerification(false);
      });
  }

  useEffect(() => {
    if (isVerification === true) {
      const { pathname } = Router;
      if (pathname === "/") {
        Router.push("/home");
      }
    } else if (isVerification === false) {
      alert(
        "❌Não foi possível encontrar o seu perfil, por favor tente novamente.❌"
      );
      setUsername("");
    }
  }, [isVerification]);

  return (
    <>
      <form onSubmit={handleSingUpLogin}>
        <input
          type="text"
          name="username"
          placeholder="Digite seu username"
          className={styles.inputLogin}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {username.length === 0 ? (
          <button className={styles.buttonLogin} type="submit">
            <img src="icons/arrow.svg" alt="" />
          </button>
        ) : (
          <button className={styles.buttonLoginActive} type="submit">
            <img src="icons/arrow.svg" alt="" />
          </button>
        )}
      </form>
    </>
  );
}
