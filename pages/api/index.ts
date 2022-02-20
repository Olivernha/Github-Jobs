// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {API_URL } from '../../lib/api'

export async function getData() {
  try{
    const data = await fetch(`${API_URL}`,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'arbeitnow-free-job-board.p.rapidapi.com',
        'x-rapidapi-key': '1b4eb114f3mshcdc85c03b9a5a3ep12d7cdjsn9b78168c2d09'
      }
    });
    const jsonData = await data.json();
    return jsonData
  }catch(err){
    return new Error('Error fetching data')
  }
  
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const jsonData = await getData();
    res.status(200).json(jsonData)
  }
  catch(err){
    res.status(500).json({error: err})
  }

 


}
