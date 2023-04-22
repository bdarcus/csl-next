

// contributor modeling needs more thought in general

export class Organization {
  orgname: string;
  location?: string;

  constructor(orgname: string, location?: string) {
    this.orgname = orgname;
    this.location = location;
  }
}

export class Person {
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

export type Contributor = Person | Organization;
