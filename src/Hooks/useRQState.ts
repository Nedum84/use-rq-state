import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryClient } from "Utils/reactquery";

export function useRQState<T>(
  queryKey: string,
  initialData?: T | ((...args: any[]) => T)
): [
  T | undefined,
  (update: Partial<T> | ((prevState: T | undefined) => Partial<T>)) => void,
  Omit<UseQueryResult<T>, "data">
] {
  const { data, ...others } = useQuery({
    queryKey: [queryKey],
    initialData: () => {
      if (initialData === undefined) {
        const storedData = getQueryCache<T>(queryKey, true);
        return storedData;
      }

      if (typeof initialData === "function") {
        const val = (initialData as CallableFunction)();
        return val;
      }

      return initialData;
    },
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  function setData(update: Partial<T> | ((prevState: T) => Partial<T>)) {
    queryClient.setQueryData([queryKey], (prevState: T | undefined) => {
      if (typeof update === "function") {
        return (update as (prevState: T) => Partial<T>)(prevState as T);
      }
      return update;
    });
  }

  return [data, setData, { ...others }];
}

const getQueryCache = <T>(queryKey: string, exact = false) => {
  const [itemCache] = queryClient.getQueriesData<T>({
    exact,
    queryKey: [queryKey],
  });

  const [_queryKeys, data] = itemCache ?? [];

  return data;
};
