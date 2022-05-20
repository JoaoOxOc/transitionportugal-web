import { i18n as I18n, InitOptions as I18nInitOptions } from 'i18next';
declare type T18nInitOptionsWithoutInitImmediate = Omit<I18nInitOptions, 'initImmediate'>;
export declare function i18nCreateInstanceSync(options: T18nInitOptionsWithoutInitImmediate): I18n;
export declare function i18nCreateInstanceAsync(options: T18nInitOptionsWithoutInitImmediate): Promise<I18n>;
export {};
//# sourceMappingURL=i18nCreateInstance.d.ts.map