import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ptLocale = require("./extensions/translations/pt.json");

export default {
  config: {
    locales: ['en', 'pt'],
    translations: {
      pt: ptLocale,
    }
  },
  bootstrap() {},
}
