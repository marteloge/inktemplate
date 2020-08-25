import { Draft } from "./types";
import fire from "./db";

// import firebase from "firebase/app";
// import "firebase/firestore";

export const logEvent = (event: string) => {
  fire.analytics().logEvent(event);
};

export const getDraft = (uuid: string) => {
  return fire
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .get()
    .then((snapshot) => snapshot.data());
};

export const createOrUpdateDraft = (uuid: string, draft: Draft) =>
  fire
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .set(draft, { merge: true })
    .then(() => uuid);
