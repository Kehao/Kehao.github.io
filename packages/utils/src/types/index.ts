export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

// eslint-disable-next-line prettier/prettier
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export type LiteralUnion<T extends U, U> = T | (U & {});

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Raw = string | number;

export type RecordAny = Record<Raw, any>;
