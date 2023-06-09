export type LocalizedTermName =
  | LocalizedTermNameLocator
  | LocalizedTermNameLocatorNumber
  | LocalizedTermNameMisc;

export type LocalizedTermNameMisc =
  | "accessed"
  | "ad"
  | "advance-online-publication"
  | "album"
  | "and"
  | "and-others"
  | "anonymous"
  | "at"
  | "audio-recording"
  | "available-at"
  | "bc"
  | "bce"
  | "by"
  | "ce"
  | "circa"
  | "cited"
  | "et-al"
  | "film"
  | "forthcoming"
  | "from"
  | "henceforth"
  | "ibid"
  | "in"
  | "in-press"
  | "internet"
  | "interview"
  | "letter"
  | "loc-cit"
  | "no date"
  | "no-place"
  | "no-publisher"
  | "on"
  | "online"
  | "op-cit"
  | "original-work-published"
  | "personal-communication"
  | "podcast"
  | "podcast-episode"
  | "preprint"
  | "presented-at"
  | "radio-broadcast"
  | "radio-series"
  | "radio-series-episode"
  | "reference"
  | "retrieved"
  | "review-of"
  | "scale"
  | "special-issue"
  | "special-section"
  | "television-broadcast"
  | "television-series"
  | "television-series-episode"
  | "video"
  | "working-paper";

export type LocalizedTermNameLocator =
  | "act"
  | "appendix"
  | "article-locator"
  | "book"
  | "canon"
  | "chapter"
  | "column"
  | "elocation"
  | "equation"
  | "figure"
  | "folio"
  | "line"
  | "note"
  | "opus"
  | "paragraph"
  | "rule"
  | "scene"
  | "sub-verbo"
  | "table"
  | "timestamp"
  | "title-locator"
  | "verse";

export type LocalizedTermNameLocatorNumber =
  | "issue"
  | "page"
  | "part"
  | "section"
  | "supplement"
  | "version"
  | "volume";

export type LocalizedTermFormat = "short" | "symbol";
