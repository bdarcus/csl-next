export abstract class Agent {
	constructor(public name: string) {}

	getSortName(): string {
		return `${this.name}`;
	}
}

export class Person extends Agent {
	givenName: string;
	familyName: string;
	constructor(name: string, gname: string, fname: string) {
		super(name);
		this.givenName = gname;
		this.familyName = fname;
	}

	public override getSortName() {
		return `${this.familyName}, ${this.givenName}`;
	}
}

export class Organization extends Agent {}

const p1 = new Person("Jane Doe", "Jane", "Doe");
const a1 = new Organization("United Nations");

function contributorKind(x: Person | Organization) {
	// x is type Person or Organization here
	if (x instanceof Person) {
		// x is type Person here
		x.familyName;
	} else {
		x.name;
	}
}

contributorKind(p1);

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
