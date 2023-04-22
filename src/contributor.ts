

// contributor modeling needs more thought in general

export type Contributor = Person | Organization;

export class Organization {
  name: string;
  location?: string;

  constructor(name: string, location?: string) {
    this.name = name;
    this.location = location;
  }

  getSortName(): string {
    return this.name;
  }
}

export class Person  {
    familyName: string;
    givenName: string;

    constructor(givenName: string, familyName: string) {
      this.givenName = givenName;
      this.familyName = familyName;
    }

    getFullName(): string {
      return `${this.givenName} ${this.familyName}`;
    }

    getGivenInitial(): string {
      return `${this.givenName[0]}`;
    }

    getSortName(): string {
      return `${this.familyName}, ${this.givenName}`;
    }
  }
