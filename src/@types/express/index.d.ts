/* eslint-disable import/no-extraneous-dependencies */
import { TypedWithT } from 'i18next-typescript';

import { TranslationKeys } from '@types/i18next.keys';

/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  type TFunction = import('../i18next.overrides').TFunction;

  export interface Request extends TypedWithT<TranslationKeys> {
    user: {
      id: string;
    };
    t: TFunction;
  }
}
