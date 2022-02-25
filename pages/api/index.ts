// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../lib/api";
interface RequestRoute extends NextApiRequest {
  limit?: string;
  company_name?: string;
  search?: string;
  category?: string;
}
export async function getData() {
  try {
    const data = await fetch(`${API_URL}?limit=1`);
    const jsonData = await data.json();
    return jsonData;
  } catch (err) {
    return new Error("Error fetching data");
  }
}
export default async function handler(
  request: RequestRoute,
  res: NextApiResponse
) {
  const req = JSON.parse(request.body);

  if (request.method === "POST") {
    let query = "";
    if (req.category) {
      query += `&category=${req.category}`;
    }
    if (req.company_name) {
      query += `&company_name=${req.company_name.replace(" ", "+")}`;
    }
    if (req.search) {
      query += `&search=${req.search}`;
    }
    if (req.limit) {
      query += `&limit=${req.limit}`;
    }
    if (query.length) {
      query = query.substring(1);
    }
    try {
      const data = await fetch(`${API_URL}?${query}`);
      const jsonData = await data.json();
      const dataResource = await jsonData.jobs;
      res.status(200).json(dataResource);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
