import { atom, selector } from "recoil";
import { tweetsData } from "../type/types";

export const tweetsDataState = atom<tweetsData>({
  key: "tweetsData",
  default: [],
});
export const tweetsDataSelector = selector<tweetsData>({
  key: "tweetsDataSelector",
  get: ({ get }) => {
    return get(tweetsDataState);
  },
  set: ({ set }, newData) => {
    set(tweetsDataState, newData);
  },
});
