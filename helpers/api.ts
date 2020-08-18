import { Draft } from "./types";
import firebase from "./db";

export const getDraft = (uuid: string) => {
  return firebase
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .get()
    .then((snapshot) => snapshot.data());
};

export const createOrUpdateDraft = (uuid: string, draft: Draft) => {
  return firebase
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .set(draft, { merge: true })
    .then(() => uuid);
};
