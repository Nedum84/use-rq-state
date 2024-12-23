# useRQState: Simplified State Management Across Components

An alternative to useState, useRQState helps manage states without prop drilling. Just use the same query key across components, and it works out of the box.

### useRQState implementation

```typescript
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryClient } from "Utils/reactquery";

export function useRQState<T>(
  queryKey: string,
  initialData?: T | ((...args: any[]) => T)
): [
  T,
  (update: Partial<T> | ((prevState: T) => Partial<T>)) => void,
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
```

### More

- **Live Demo**: [https://nedum84.github.io/use-rq-state/](https://nedum84.github.io/use-rq-state)
- **Detailed Article**: [https://dev.to/thenelson_o/simplified-state-management-with-userqstate-a-better-alternative-to-usestate-3eno/](useRQState Management on Dev.to)
