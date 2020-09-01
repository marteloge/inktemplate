import { Draft } from "./types";
import fire from "./db";

export const logEvent = (event: string) => {
  try {
    fire.analytics().logEvent(event);
  } catch (e) {
    console.error("Could not log analytics event");
  }
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
