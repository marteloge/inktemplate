import { Router } from "../i18n";
import { Draft } from "./types";
import { PRODUCTS } from "./global";
import firebase from "./../lib/db";

export const getDraft = async (uuid: string) => {
  return await firebase
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .get()
    .then((snapshot) => snapshot.data());
};

export const saveOrUpdateDraft = async (uuid: string, draft: Draft) => {
  return await firebase
    .firestore()
    .collection("drafts")
    .doc(uuid)
    .set(draft, { merge: true });
};

export const createNewDraft = (payload) => {
  return fetch("http://localhost:8000/draft", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
};

export const saveDraft = (pdfData) => {
  return fetch("http://localhost:8000/draft/" + pdfData.uuid, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pdfData),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem(PRODUCTS.PLACECARD.name, JSON.stringify(data));
      return data;
    });
};

export const fetchDraft = async (uuid) => {
  const res = await fetch("http://localhost:8000/draft/" + uuid);
  return await res.json();
};

export const getLocalOrCreateDraft = (productID) => {
  const placecard: Draft = JSON.parse(
    localStorage.getItem(PRODUCTS.PLACECARD.name)
  );

  if (placecard) {
    Router.push("/create/" + placecard.uuid);
  } else {
    createNewDraft({
      product_id: productID,
    }).then((data) => {
      localStorage.setItem(PRODUCTS.PLACECARD.name, JSON.stringify(data));
      Router.push("/create/" + data.uuid);
    });
  }
};
