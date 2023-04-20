// REVIEW not sure where best to do this
type Lang =
  | "af-ZA"
  | "ar"
  | "bg-BG"
  | "ca-AD"
  | "cs-CZ"
  | "da-DK"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "el-GR"
  | "en-GB"
  | "en-US"
  | "es-ES"
  | "et-EE"
  | "eu"
  | "fa-IR"
  | "fi-FI"
  | "fr-CA"
  | "fr-FR"
  | "he-IL"
  | "hr-HR"
  | "hu-HU"
  | "is-IS"
  | "it-IT"
  | "ja-JP"
  | "km-KH"
  | "ko-KR"
  | "lt-LT"
  | "lv-LV"
  | "mn-MN"
  | "nb-NO"
  | "nl-NL"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "sk-SK"
  | "sl-SI"
  | "sr-RS"
  | "sv-SE"
  | "th-TH"
  | "tr-TR"
  | "uk-UA"
  | "vi-VN"
  | "zh-CN"
  | "zh-TW";

export interface Locale {
  translators?: string;
  rights?: string; // use enum here, and in style
  locale: Lang; // https://github.com/anton-bot/locale-enum
  punctuationInQuote: boolean;
  terms: Term[];
}

export interface Term {
  name: string;
  form?: "short" | "symbol";
  single?: string;
  multiple?: string; // TODO this and above need to be coupled
}

export interface DateTerm extends Term {
  dateParts: string[]; // TODO
}
