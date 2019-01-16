export type Options<A extends string|number=string,B extends string|number=string> = {
  key: string;
  getAfromB(b: B): Promise<A>;
  getBfromA(a: A): Promise<B>;
  storage?: Storage;
  saveThrottle?: number;
  maxLimit?: number;
  maxAge?: number;
};

// The type parameters are mainly so Flow helps us avoid mixing up A and B.
// Generally you'll probably have them both be strings.
export default class BiMapCache<A extends string|number=string,B extends string|number=string> {
  constructor(options: Options<A,B>);

  getBfromA(a: A): Promise<B>;
  getAfromB(b: B): Promise<A>;
  removeAfromCache(a: A): void;
  removeBfromCache(b: B): void;
}
