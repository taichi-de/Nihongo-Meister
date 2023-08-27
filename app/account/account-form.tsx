"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../../types/database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Input, Text } from "@mantine/core";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GiNinjaHead } from "react-icons/gi";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ username }: { username: string | null }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        username,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action="/auth/signup" method="post" className="px-[15%] text-gray">
      <Text className="my-4">Lass uns wissen, wie du heißt!</Text>
      <Input
        icon={<GiNinjaHead />}
        placeholder="Dein Nutzername"
        id="username"
        type="text"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        icon={<MdOutlineAlternateEmail />}
        placeholder="Deine Email Adresse"
        id="email"
        type="text"
        value={session?.user.email}
        className="my-4"
        onChange={(e) => setUsername(e.target.value)}
        disabled
      />
      <form action="/auth/signout" method="post">
        <button className="bg-third/70 py-2 px-4 rounded-md" type="submit">
          Sign out
        </button>
      </form>
    </form>
  );
}
