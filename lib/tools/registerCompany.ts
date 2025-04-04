import { tool } from 'ai';
import { z } from 'zod';

export const registerCompanyTool = tool({
  description: 'Cadastrar uma nova empresa na base de dados',
  parameters: z.object({
    location: z.string().describe(''),
  }),
  // location below is inferred to be a string:
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});