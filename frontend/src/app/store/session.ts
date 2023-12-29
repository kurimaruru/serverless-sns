import type { Session } from "next-auth";
import { atom } from "recoil";

export const sessionState = atom<Session | null>({
  key: "session",
  default: null,
});
