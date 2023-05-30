export type ReferenceTypes = "book" | "article" | "chapter";

export type ContributorRoles = "author" | "editor" | "publisher";

export type Dates = "issued" | "accessed";

export type Titles = "title" | "containerTitle";

export type SimpleTypes = "volume" | "issue" | "pages";

/** The display form of the role. */
export type ContributorRoleForms =

  /* The full name of the role.
   *
   * > Jane Smith (editor)
   */
  | "long"
  /// Jane Smith (ed.)
  | "short"
  ///  edited by Jane Smith
  | "verb"
  /// ed. Jane Smith
  | "verb-short";
