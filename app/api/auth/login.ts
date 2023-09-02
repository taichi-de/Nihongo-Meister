/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  let { user, error } = await supabase.auth.signIn({ email, password });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ user });
};
