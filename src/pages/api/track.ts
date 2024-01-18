// pages/api/rastreamento.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
  ) {
  const { codigo } = req.query;

  try {
    const response = await axios.get(`URL_DA_API/${codigo}`, {
      headers: {
        'Authorization': 'Bearer 1QTOdGIUrgLpyFs07iszMSYTVRGeY8IpmEdNEn8J'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao rastrear a encomenda" });
  }
}
