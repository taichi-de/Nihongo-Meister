/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { error } = await supabase.auth.signOut();

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ message: 'Logged out successfully' });
};
