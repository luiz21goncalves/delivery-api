declare namespace i18next {
  type Keys = import('../shared/dtos/i18next.keys').TranslationKeys;
  type TFunction = import('./i18next.overrides').TFunction;

  export type ResourceKey = Keys;
  export type TFunction = TFunction;
}
