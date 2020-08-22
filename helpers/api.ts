import { Draft } from "./types";
import firebase from "./db";

export const getDraft = (uuid: string) => {
  firebase.analytics().logEvent("getDraft");

  return firebase
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .get()
    .then((snapshot) => snapshot.data());
};

export const createOrUpdateDraft = (uuid: string, draft: Draft) => {
  firebase.analytics().logEvent("createOrUpdateDraft");

  return firebase
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .set(draft, { merge: true })
    .then(() => uuid);
};
