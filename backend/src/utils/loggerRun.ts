export class Nothing {}
export class NothingP {
  constructor() {
    return Promise.resolve(new Nothing());
  }
}
export function loggerRunP(
  value: Promise<any> | NothingP,
  logger: { info: Function; error: Function }
) {
  return {
    map(fn: (a: any) => Promise<any>) {
      try {
        if (value instanceof NothingP) {
          return loggerRunP(value, logger);
        }

        return loggerRunP(fn(value), logger);
      } catch (err) {
        logger.error(err);
        return loggerRunP(new NothingP(), logger);
      }
    },
    async flat() {
      console.log(value);
      if (value instanceof NothingP) return null;
      return value;
    },
  };
}
