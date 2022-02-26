// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../lib/api";

export async function getData() {
  try {
    const data = await fetch(`${API_URL}?limit=50`);
    const jsonData = await data.json();
    return jsonData;
  } catch (err) {
    return new Error("Error fetching data");
  }
}
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
