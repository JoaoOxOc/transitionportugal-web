import { __assign } from "tslib";
import i18next from 'i18next';
function i18nCreateInstance(options) {
    var _i18next = i18next.createInstance();
    return [_i18next, _i18next.init(options)];
}
export function i18nCreateInstanceSync(options) {
    var initOptions = __assign(__assign({}, options), { initImmediate: false });
    var _i18next = i18nCreateInstance(initOptions)[0];
    return _i18next;
}
export function i18nCreateInstanceAsync(options) {
    var initOptions = __assign(__assign({}, options), { initImmediate: true });
    var _a = i18nCreateInstance(initOptions), _i18next = _a[0], _i18nextPromise = _a[1];
    return _i18nextPromise.then(function () { return _i18next; });
}
//# sourceMappingURL=i18nCreateInstance.js.map