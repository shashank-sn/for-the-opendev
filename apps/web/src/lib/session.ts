import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";

export async function getServerSession() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  return session;
}

export async function requireSession() {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthorized");
  }
  return session;
}