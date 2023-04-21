import { Locale } from './locale';

export type CiteRef = {
  prefix?: string;
  refID: ID;
  suffix?: string;
  locales?: Locale[]; // from v1.1 branch; a structured array
}
