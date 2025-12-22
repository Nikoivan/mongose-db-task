export type CounterResponse<T extends boolean = boolean> = {
  success: T;
  count?: T extends true ? number : never;
};
