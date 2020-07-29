type Task<T> = T[keyof T] extends Promise<infer U> ? Promise<U> : T[keyof T];
type Resolve<T> = T[keyof T] extends Promise<infer U> ? U : T[keyof T];
type ReturnValue<T> = {
  [K in keyof T]: T[K] extends Promise<infer U> ? U : T[K];
};

export const mappedPromiseAll = async <
  T extends {
    [K in keyof T]: T[K] extends Promise<infer U> ? Promise<U> : T[K];
  }
>(
  map: T
): Promise<ReturnValue<T>> => {
  const tmpKeyMap: Record<number, keyof T> = {};
  const promises = Object.entries<Task<T>>(map).map(([key, promise], index) => {
    tmpKeyMap[index] = key as keyof T;
    return promise;
  });

  const resolves = (await Promise.all(promises).catch((error) => {
    throw error;
  })) as Resolve<T>[];
  return resolves.reduce<ReturnValue<T>>((responses, resolve, index) => {
    const key = tmpKeyMap[index];
    responses[key] = resolve;
    return responses;
  }, {} as ReturnValue<T>);
};
