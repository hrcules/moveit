import { NowRequest, NowResponse } from "@vercel/node";
import connectToDataBase from "../../database";

export default async (request: NowRequest, response: NowResponse) => {
  const { username, currentExperience } = request.body;

  const db = await connectToDataBase(String(process.env.MONGODB_URI));
  const collection = db.collection("users");
  const myQuery = { login: username };
  const newValues = { $set: { currentExperience: currentExperience } };

  await collection.updateOne(myQuery, newValues);

  return response.json({ ok: "ok" });
};
