import { stringFormatData } from './data.js';

function truncateString(string, options, template) {
  if (string.length <= options.maxLength) {
    return string;
  }

  switch (options.type) {
    case 'end':
      string = string.substr(0, options.maxLength - template.length + 3);
      return template.replace('{0}', string);

    case 'start':
      const startIdx = string.length - options.maxLength - template.length + 3;
      string = string.substr(startIdx);
      return template.replace('{0}', string);

    case 'middle':
      const maxLength = options.maxLength - (template.length - 6);
      const maxLengthPart = Math.round(maxLength / 2);

      const prePart = string.substr(0, maxLengthPart);

      const left = maxLength - maxLengthPart;
      const postPart = string.substr(string.length - left);

      return template.replace('{0}', prePart).replace('{1}', postPart);
  }
}

export default class StringFormat {
  constructor(locales, options = {}) {
    this.locale = locales ? locales[0] : 'en-US';

    this._templates = stringFormatData[this.locale];
  }

  static supportedLocalesOf(locales, options = {}) {
  }

  resolvedOptions() {
    return {
      locale: this.locale,
    };
  }

  truncate(string, options) {
    const template = this._templates[options.type];
    return truncateString(string, options, template);
  }
};

String.prototype.truncate = function(locales, options) {
  const locale = locales ? locales[0] : 'en-US';

  const _templates = stringFormatData[locale];
  const template = _templates[options.type];

  return truncateString(this, options, template);
}

/*global ClobberIntlLocale:false */

if (typeof Intl === 'undefined') {
    if (typeof global !== 'undefined') {
        global.Intl = { StringFormat };
    } else if (typeof window !== 'undefined') {
        window.Intl = { StringFormat };
    } else {
        this.Intl = { StringFormat };
    }
} else if (!Intl.StringFormat || (typeof ClobberIntlStringFormat !== 'undefined' &&
      ClobberIntlStringFormat)) {
    Intl.StringFormat = StringFormat;
} else if (typeof console !== 'undefined') {
    console.warn('Intl.StringFormat already exists, and has NOT been replaced by this polyfill');
    console.log('To force, set a global ClobberIntlStringFormat = true');
}
