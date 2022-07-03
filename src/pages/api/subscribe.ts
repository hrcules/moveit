import { NowRequest, NowResponse } from "@vercel/node";
import connectToDataBase from "../../database";

export default async (request: NowRequest, response: NowResponse) => {
  const { username } = request.body;

  const login = username.login;
  const name = username.name;
  const avatarImg = username.avatar_url;

  const db = await connectToDataBase(String(process.env.MONGODB_URI));
  const collection = db.collection("users");
  const busca = await collection.findOne({ login: login });

  if (!busca) {
    await collection.insertOne({
      login,
      name,
      avatarImg,
      level: 1,
      currentExperience: 0,
      challengesCompleted: 0,
    });
  }

  return response.status(201).json({ ok: "ok" });
};
