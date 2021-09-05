/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  type TFunction = import('../i18next.overrides').TFunction;

  export interface Request {
    user: {
      id: string;
    };
    t: TFunction;
  }
}
