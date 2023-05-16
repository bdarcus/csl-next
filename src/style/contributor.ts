// contributor modeling needs more thought in general

// keep this simple for now
export class Contributor {
  constructor(
    public name: string,
    public role: string = "author",
    public parse: boolean = true,
  ) {
    this.name = name;
    this.role = role;
    this.parse = parse;
  }
}
