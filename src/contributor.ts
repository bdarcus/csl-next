// contributor modeling needs more thought in general

export abstract class Contributor {
	name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    display(): string {
        return this.name;
    }
}

export class Organization extends Contributor {
	name: string;
	location?: string;

	constructor(name: string, location?: string) {
		super(name);
		this.name = name;
		this.location = location;
	}

	sortName(): string {
		return this.name;
	}
}

export class Person extends Contributor {
	name: string;
	familyName: string;
	givenName: string;

	constructor(name: string, givenName: string, familyName: string) {
		super(name);
		this.name = name;
		this.givenName = givenName;
		this.familyName = familyName;
	}

	displayName(initialize: boolean): string {
		return `${this.givenName} ${this.familyName}`;
	}

	sortName(): string {
		return `${this.familyName}, ${this.givenName}`;
	}
}
