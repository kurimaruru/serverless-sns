import type { Session } from "next-auth";
import { headers } from "next/headers";
import { ValidSession } from "../type/types";

export const fetchSession = async (): Promise<Session | null> => {
  const cookie = headers().get("cookie") ?? "";
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });
  const session = (await response.json()) as Session;
  return Object.keys(session).length > 0 ? session : null;
};

export const isValidSession = (
  session: Session | null
): session is ValidSession => {
  if (session) {
    if (
      session.user?.name != null &&
      session.user.email != null &&
      session.user.image != null
    ) {
      return true;
    }
  }
  return false;
};
