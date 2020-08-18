import useSWR from "swr";

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
