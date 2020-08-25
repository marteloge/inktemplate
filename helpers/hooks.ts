import useSWR from "swr";
import { useState, useEffect } from "react";

export const useDraft = (session_id) => {
  const { data, error } = useSWR(`/api/checkout/${session_id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useOrder = (session_id) => {
  const { data, error } = useSWR(`/api/checkout/${session_id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePrices = () => {
  const { data, error } = useSWR(`/api/prices`, (url) =>
    fetch(url).then((res) => {
      return res.json();
    })
  );

  return {
    prices: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useScreenDimentions = () => {
  const [screen, setScreen] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setScreen({ width: window.innerWidth, height: window.innerHeight });
  });

  return [screen, setScreen];
};
