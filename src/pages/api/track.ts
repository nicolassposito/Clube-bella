// pages/api/rastreamento.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const { rastrearEncomendas } = require('correios-brasil');


export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
  ) {

  try {
    
  } catch (error) {
    res.status(500).json({ erro: "Erro ao rastrear a encomenda" });
  }
}
