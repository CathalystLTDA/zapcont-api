import { NextApiRequest, NextApiResponse } from 'next';
import { getUserInfoByChatId, registerUserInfo, updateUserInfo, deleteUserInfo } from '@/app/utils/userInfo';

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { chatId } = req.query;
  if (!chatId || typeof chatId !== 'string') {
    return res.status(400).json({ error: 'Invalid chatId' });
  }
  try {
    const userInfo = await getUserInfoByChatId(chatId);
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { chatId, nome, cpf, dataNascimento, email } = req.body;
  if (!chatId || !nome || !cpf || !dataNascimento || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const user = await registerUserInfo(chatId, nome, cpf, dataNascimento, email);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { chatId, ...updates } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'chatId is required' });
  }
  try {
    const user = await updateUserInfo(chatId, updates);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { chatId } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'chatId is required' });
  }
  try {
    await deleteUserInfo(chatId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'POST') return handlePost(req, res);
  if (req.method === 'PUT') return handlePut(req, res);
  if (req.method === 'DELETE') return handleDelete(req, res);
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
